---
layout: post
title:  "Control An Elevator"
date:   2022-10-16 13:40:16 +0100
categories: ['C#', '.NET', 'GUI', 'MSAccess', 'Disconnected Model', 'Event Driven', 'Entity Framework']
description: "C# application using the popular .NET framework by Microsoft to simulate the actions and animation of an elevator."
repo: "https://github.com/KyleKeeneWelch/control-an-elevator"
---
## Summary
This project uses `C#` and the popular `.NET framework` by Microsoft to simulate the actions and animation of an elevator. 

Using an `event driven approach`, a user will interact with a provided graphical user interface and will select the appropriate floor the elevator should go to. The program will respond through the various assigned delegates and event handlers to open and close the elevator doors, change the floor indicators, display the control panel and display the elevator "log". Trips are stored within a `MSAccess database` and is accessed and updated using the command builder in the `Entity Framework`. Other great features include asynchronous operations using `background worker` and the use of the `disconnected database model`.

## Features
- **MSAccess Database Connectivity** - Application instantiates and populates an MSAccess database and uses related Entity Framework functions to update and get changes to the data and database schema so they are concurrent.

- **Disconnected Model** - Application uses a local dataset that it changes in accordance to the input from the user. This dataset is pushed forward and a commit to the database is made when the user chooses to "save" from the save button instead of making a commit after each action. This saves server processing time and reduces unnecessary overhead. 

- **Asynchronous Operations** - Utilizing background worker service to run select operations on a separate thread. Allows user to continue to move the elevator between floors all while saving or loading the log asynchronously.

- **Command Builder** - Abstracts redundant command building processes through the use of OleDB Command Builder. More focus is on application logic rather than connectivity and commands to the database.

- **Paint Tools and Timer** - Uses a timer that periodically checks the condition of the elevator and refreshes the drawings of the doors in correspondance to the current condition. Creates the "animation" effect through the redrawing of elevator doors in the correct location per frame.

### Elevator Idle
<img src="{{site.baseurl}}/assets/images/elevatorIdle.png" alt="Elevator Idle">

Here we can see the graphical user interface in its idle state. The floors, call buttons and panel and the doors can be seen on the left. The elevator "log" or events can be seen on the right with buttons to save, load, clear and delete trips. Finally an additional close button is provided alternative to the one found on the window.

### Elevator Moving

<img src="{{site.baseurl}}/assets/images/elevatorMoving.png" alt="Elevator Moving">

When we have pressed a button to either call or move the elevator to a floor, the doors will open to allow individuals to enter, close and then after a short pause, the process will repeat. The doors will now however open on the destination floor and the floor indicators as well as the panel will change to reflect this. The elevator events will also add the new trip. 

### Elevator Log Saved While Moving 

<img src="{{site.baseurl}}/assets/images/elevatorSave.png" alt="Elevator Log Saved While Moving">

When we save we will asynchronously connect to the database and will commit the local dataset to the data stored within the table. This means that we can still move our elevator to a floor while the application saves the trips in the elevator "log" excluding the new trip. The save progress can be found at the top right as a progress bar.

### Implementation

#### Moving The Elevator

{% highlight ruby %}
private void moveElevator(int destination)
{
    if (checkFloor(destination) == true)
    {
        return;
    }

    addTrip(destination);
    isIdle = false;
    isOpening = true;
    elevatorDestination = destination;

    switch (destination)
    {
        case 0:
            btnRequest0.Enabled = false;
            btnRequest1.Enabled = true;
            break;
        case 1:
            btnRequest1.Enabled = false;
            btnRequest0.Enabled = true;
            break;
    }
    updateList();
}
{% endhighlight %}

One of the main functions of the implementation was the `moveElevator` function. This would check whether we were already on the destination floor otherwise would add the trip to the events, set the condition of the doors and the destination and would enable or disable the appropriate buttons depending on what floor the elevator is going to. `Updatelist` would refresh the list box that is shown to the user containing the local dataset.

#### Loading and Saving

{% highlight ruby %}
private void loadData()
{
    try
    {
        adapter.Fill(ds);
    }
    catch (Exception ex)
    {
        MessageBox.Show(ex.ToString(), "Error", MessageBoxButtons.OK);
    }
}

private void saveToDb()
    {
        if (ds.Tables[0].Rows.Count != 0)
        {
            try
            {
                DataSet dataSetChanges = ds.GetChanges();
                adapter.Update(dataSetChanges);
                ds.Tables[0].AcceptChanges();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Error", MessageBoxButtons.OK);
            }
        }
    }
{% endhighlight %}

Another important area of the application was the loading and saving to and from the database. Here we have the `loadData` and `saveToDb` functions which make use of the `OleDbDataAdapter`'s methods `Fill` and `Update`. The application will use `Fill` to try to load the data from the table in the database into the local dataset. Using `GetChanges` on the local dataset, the application will try to use `Update` to build the needed commands to reflect the changes to the data on the database (this is the `disconnected model`). Upon success, the application will commit these changes.

#### Timer and Refresh

{% highlight ruby %}
private void tmr_Tick(Object sender, EventArgs e)
{
    if (!isIdle)
    {
        if (elevatorStatus == 0)
        {
            pan0.Refresh();
        }
        else
        {
            pan1.Refresh();
        }
    }
}

private void pan0_paint(object sender, PaintEventArgs e)
{
    if (isIdle)
    {
        elevatorDoors(pan0);
    }
    else if (isOpening)
    {
        openDoors(pan0);
    }
    else if (isClosing)
    {
        closeDoors(pan0);
    }
}
{% endhighlight %}

Within the "animation" aspect of the application, we have used a `timer` and the `refresh event` of a panel to emulate this effect. The `timer` will run its `tick event` periodically after a predetermined amount of time. Once this runs, it will check the current condition of the elevator. If idle, the elevator is not redrawn. If the status is 0 or on ground floor then refresh the ground floor panel, otherwise refresh the first floor panel. Note that additional floors can easily be added through the slight modification of conditions like these. 

The refresh event will run the `paint event handler` for the appropriate floor panel. If the elevator is idle, the floor panel is redrawn to draw the doors once. If the doors are opening, the floor panel is redrawn to animate doors opening. If the doors are closing, the floor panel is redrawn to animate the doors closing.

#### Background Worker

{% highlight ruby %}
private void backgroundWorker1_DoWork(object sender, DoWorkEventArgs e)
{
    BackgroundWorker helperBW = sender as BackgroundWorker;
    int arg = (int)e.Argument;
    int percentage;
        
    bool anyChanges = ds.GetChanges() != null;

    if (anyChanges)
    {
        DialogResult result = MessageBox.Show("Saving. Please do not close or remove power from your system.", "Saving", MessageBoxButtons.OKCancel);

        if (result == DialogResult.Cancel)
        {
            backgroundWorker1.CancelAsync();
        }

        saveToDb();

        for (int i = 0; i < arg; i++)
        {
            Thread.Sleep(100);
            percentage = (i + 1) * 100 / arg;
            helperBW.ReportProgress(percentage);

            if (helperBW.CancellationPending)
            {
                e.Cancel = true;
                e.Result = i;
                break;
            }
        }
        e.Result = arg;
    }
    else
    {
        MessageBox.Show("There have been no changes to save", "Error", MessageBoxButtons.OK);
    }
}
{% endhighlight %}

A final important feature in implementation is the use of the background worker service which allows the application to perform asynchronous operations on a seperate thread. The `backgroundworker_DoWork` event handler will run when the background worker is set. The event handler will assign a variable `arg` with the value of the asynchronous operation. If there are any changes to the dataset, alert the user that the application is saving and run `saveToDb`. Convert the value of `arg` to percentage and update the progress bar through the `ReportProgress` event and `ProgressChanged` event handler. Set the result as `arg` as operation succeeded which runs the `RunWorkerCompleted` event handler. If at any point the user cancels, set as cancelled and show save cancelled message.