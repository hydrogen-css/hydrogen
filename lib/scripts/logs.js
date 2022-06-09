function h2Error(error) {
  console.log('⛔ [' + 'Hydrogen'.magenta + ']', error);
}

function h2Warning(error) {
  console.log('🔔 [' + 'Hydrogen'.magenta + ']', error);
}

function h2Timer(msg, start, end) {
  var ms = (end - start) / BigInt(1000000);
  console.log('⌚ [' + 'Hydrogen'.magenta + '] ' + msg + ':', ms + 'ms.');
}

module.exports = {
  h2Error,
  h2Warning,
  h2Timer,
};
