let iAm = 'anonymous';

export function setWhoIAm (me) {
  iAm = me;
}

export function whoAmI () {
  return iAm;
}
