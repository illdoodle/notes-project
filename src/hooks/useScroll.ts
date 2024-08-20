// import {useActions} from "./useActions";


//getScrollData()
export const useScroll = () => {
    return {
        scrolled: document.documentElement.clientHeight + document.documentElement.scrollTop,
        documentHeight: document.documentElement.scrollHeight,
        clientHeight: document.documentElement.clientHeight,
    }
}

// export const scrollHandler = () => {
    // const {setArrow} = useActions()
    // const scrollData = getScrollData();
    //
    // if(scrollData.scrolled > scrollData.clientHeight) {
    //     setArrow(true);
    // } else {
    //     setArrow(false);
    // }
    //
    // if(scrollData.scrolled >= scrollData.documentHeight) {
    //     loadNotes();
    // }
// }