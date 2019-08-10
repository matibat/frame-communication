
export function windowToIterable(windowObject) {
    const iterable = [ ];
    for (let i = 0; i < windowObject.length; i++) {
        iterable.push(windowObject[i]);
    }
    iterable.frames = windowObject.frames;
    return iterable;
}

