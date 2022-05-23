function h2Error(error) {
  console.log('⛔ [' + 'Hydrogen'.magenta + ']', error);
}

function h2Warning(error) {
  console.log('🔔 [' + 'Hydrogen'.magenta + ']', error);
}

module.exports = {
  h2Error,
  h2Warning,
};
