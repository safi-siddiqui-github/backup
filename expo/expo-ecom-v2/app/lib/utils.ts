export function slugify(text:string){
    return text.split(' ').map((each) => each.toLocaleLowerCase()).join('-');
}