import type {IUploadImageInBase} from "~/struct/Common/ICommonUpload";

function calc(img:  HTMLImageElement ,image: IUploadImageInBase, id: number, displayContainerWidth: number): Record<string, string> | null {
    if(!image.coordinates) return null
    const scale = displayContainerWidth / image.coordinates.width
    console.log('img.naturalWidth onload ', img.naturalWidth, displayContainerWidth, scale)

    const offsetX = -image.coordinates.left * scale;
    const offsetY = -image.coordinates.top * scale;
    return {
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        width: (img.naturalWidth * scale) + 'px',
        height: (img.naturalHeight * scale) + 'px',
    }
}
export function coordinatesStyleSingle(dataImg: IUploadImageInBase, id: number, displayContainerWidth: number, blockHTML: HTMLElement | null): Promise<Record<string, string> | null> {
    return new Promise((resolve, reject) => {
        if (!displayContainerWidth || !dataImg.url || !dataImg.coordinates) resolve(null)
        const img = new Image();
        img.src = dataImg.url
        console.log('img65454', dataImg)
        if (img.complete && img.naturalWidth && img.naturalHeight && blockHTML) {
            resolve(calc(img, dataImg, id, displayContainerWidth))
        } else {
            img.onload = async () => {
                if (img.naturalWidth && img.naturalHeight) {
                    resolve(calc(img, dataImg, id, displayContainerWidth))
                } else {
                    resolve(null);
                }
            }
        }
    })
}
