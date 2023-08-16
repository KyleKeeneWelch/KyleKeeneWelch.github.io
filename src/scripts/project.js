export class Project {
  constructor(title, date, tags, description, repo, url, image) {
    this.title = title;
    this.date = date;
    this.tags = tags;
    this.description = description;
    this.repo = repo;
    this.url = url;
    this.image = image;
  }

  showInfo() {
    return {
      title: this.title,
      date: this.date,
      tags: this.tags,
      description: this.description,
      repo: this.repo,
      url: this.url,
      image: this.image,
    };
  }

  getTitle() {
    return this.title;
  }

  setTitle(newTitle) {
    this.title = newTitle;
  }

  getDate() {
    return this.date;
  }

  setDate(newDate) {
    this.date = newDate;
  }

  getTags() {
    return this.tags;
  }

  setTags(newTags) {
    this.tags = newTags;
  }

  getDescription() {
    return this.description;
  }

  setDescription(newDescription) {
    this.description = newDescription;
  }

  getRepo() {
    return this.repo;
  }

  setRepo(newRepo) {
    this.repo = newRepo;
  }

  getUrl() {
    return this.url;
  }

  setUrl(newUrl) {
    this.url = newUrl;
  }

  getImage() {
    return this.image;
  }

  setImage(newImage) {
    this.image = newImage;
  }
}
