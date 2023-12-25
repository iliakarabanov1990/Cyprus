export enum roomsNumberTypes {
    studio = <any> 'studio',
    onePlusOne = <any> 'onePlusOne',
    twoPlusOne = <any> 'twoPlusOne',
    threePlusOne = <any> 'threePlusOne',
    fourPlus = <any> 'fourPlus',
}

export const roomsNumberDescription = new Map<roomsNumberTypes, string>([
    [roomsNumberTypes.studio, 'Студия'],
    [roomsNumberTypes.onePlusOne, '1+1'],
    [roomsNumberTypes.twoPlusOne, '2+1'],
    [roomsNumberTypes.threePlusOne, '3+1'],
    [roomsNumberTypes.fourPlus, '4+']
  ]);