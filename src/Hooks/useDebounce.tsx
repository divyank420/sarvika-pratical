import { useEffect, useState } from "react";


const useDebounce = (value:string,delay:number) => {
    const [debounceSearch, setDebounceSearch] = useState<string>(value);

    useEffect(() => {
        const handler = setTimeout(()=>{
            setDebounceSearch(value);
            console.log('Debounced Value:', value);
        },delay)

        return ()=>clearTimeout(handler);
    },[value, delay]);
  return [debounceSearch];
}

export default useDebounce;
