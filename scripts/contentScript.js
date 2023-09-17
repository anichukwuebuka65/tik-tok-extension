const sortTypes = {
   likes: "[data-e2e=\"like-count\"]",
   comments: "[data-e2e=\"comment-count\"]",
   shares: "[data-e2e=\"share-count\"]",
   bookmarks: "[data-e2e=\"undefined-count\"]"
}

chrome.runtime.onMessage.addListener(handleMessage);

function handleMessage(message) {
   sort(message.sort)
}

function sort(message){
   const selector = sortTypes[message];
   const elems = q('[data-e2e="recommend-list-item-container"]', true);
   const sortedElems = [...elems].sort((a, b) => handleSort(a, b, selector));
   sortedElems.forEach(node => {
      elems[0].parentNode.appendChild(node)
      
   })

   setTimeout(() => {

      for(let i = 0; i < sortedElems.length; i++){
         const node = sortedElems[i]
         if(node.getBoundingClientRect().top > 0){
            const playBtn = node.querySelector("[data-e2e=\"video-play\"]");
            playBtn.click();
            break;
         }
      }
   },1000) 
 }

 function handleSort(a, b, selector) {
    return getValue(b, selector) - getValue(a, selector);
 }

 function getValue(elem, selector) {

   const value = elem.querySelector(selector).textContent;
   return transformValueForCalc(value)
 }

 function transformValueForCalc(value){
   console.log(value)
    if(value.includes("K")){
        return Number(value.slice(0, -1)) * 1000;
    } else if (value.includes("M")){
        return Number(value.slice(0, -1)) * 1000000;
    }
    return Number(value)
 }

 function q (selector, multiElement, source) {
    if(multiElement){
        return (source || document).querySelectorAll(selector)
    }
    return (source || document).querySelector(source)
 }


 