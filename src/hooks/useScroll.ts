const getScrollData = () => {
    return {
        scrolled: document.documentElement.clientHeight + document.documentElement.scrollTop,
        documentHeight: document.documentElement.scrollHeight,
        clientHeight: document.documentElement.clientHeight,
    }
}

export const useScroll = ({setArrow, loadNotes}) => {
    const scrollData = getScrollData();

    if(scrollData.scrolled > scrollData.clientHeight) {
        setArrow(true);
    } else {
        setArrow(false);
    }

    if(scrollData.scrolled >= scrollData.documentHeight) {
        loadNotes();
    }
}