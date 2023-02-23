export const sortingArray = (array) => array.sort((a, b) => {
    if(a.city > b.city){
        return 1;
    }else if(b.city === a.city){
        return 0
    }else{
        return -1
    }
} )