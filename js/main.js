
let profile, media, contact, buttonContact;

// utility function for returning a promise that resolves after a delay
function delay(t) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t);
  });
}

Promise.delay = function (fn, t) {
  // fn is an optional argument
  if (!t) {
    t = fn;
    fn = function () {};
  }
  return delay(t).then(fn);
}

Promise.prototype.delay = function (fn, t) {
  // return chained promise
  return this.then(function () {
    return Promise.delay(fn, t);
  });
}


window.onload = () => {

  profile = document.getElementById('profile');
  media = document.getElementById('media');
  contact = document.getElementById('contact');
  buttonContact = document.getElementById('buttonContact');

  Promise.delay(() => {
    document.getElementById('dummy').style.opacity = '0';
    profile.style.display = 'flex';
  }, 3000)
  .delay(() => {
    media.style.display = 'block';
  }, 2000)
  .delay(() => {
    contact.style.display = 'flex';
  }, 2000)
  .delay(() => {
    buttonContact.style.display = 'flex';
  }, 2000)


}