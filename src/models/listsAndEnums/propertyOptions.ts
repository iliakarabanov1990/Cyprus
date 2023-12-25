export enum propertyOptions {
    outdoorPool = <any> 'outdoorPool',
    indoorPool = <any> 'indoorPool', 
    videoSurveillance = <any> 'videoSurveillance', 
    bar = <any> 'bar', 
    restaurant = <any> 'restaurant', 
    fitnessRoom = <any> 'fitnessRoom', 
}

export const propertyOptionsDescription = new Map<propertyOptions, string>([
    [propertyOptions.outdoorPool, 'открытый бассейн'],
    [propertyOptions.indoorPool, 'закрытый бассейн'],
    [propertyOptions.videoSurveillance, 'видеонаблюдение'],
    [propertyOptions.bar, 'бар'],
    [propertyOptions.restaurant, 'ресторан'],
    [propertyOptions.fitnessRoom, 'фитнес зал'],
  ]);