import {
  Map,
  List
}
from 'immutable';

export default function() {
  return Map()
    .set('messages', List.of([]));
}
