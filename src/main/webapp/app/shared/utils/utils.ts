export class Utils{
    public static shuffleArray(array: Array<any>): Array<any> {
        let m = array.length, t, i;
     
        while (m) {    
         i = Math.floor(Math.random() * m--);
         t = array[m];
         array[m] = array[i];
         array[i] = t;
        }
     
       return array;
     }
}