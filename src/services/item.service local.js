import { storageService } from "./async-storage.service"
import { httpService } from "./http.service"
import { localStorageService } from "./localStorage.service"
import { utilService } from "./util.service"
const Item_DB = 'item'

_setItems()


export const itemService = {
    getItems,
    getEmptyItem,
    getItemById,
    addItems,
    addComment,
    getEmptyFilterBy

}
function _setItems() {
    console.log('hiiiiiiiiiiiii1');
    const items = utilService.loadFromStorage(Item_DB)
    if (!items) {
        utilService.saveToStorage(Item_DB, _creatItems())

    }

}
function _creatItems() {
    console.log('hiiiiiiiiiiiii2');

    const items = [
        {
            _id: utilService.makeId(8),
            title: `A- ${utilService.makeLorem(1)} `,
            imgUrl: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-17987062/original/452c1d59-164c-4a2d-bf35-68ddb6643a07.jpeg?im_w=1200',
            content: utilService.makeLorem(8),
            creactedAt: Date.now(),
            price: 2059,
        },
        {
            _id: utilService.makeId(8),
            title: `B- ${utilService.makeLorem(1)} `,
            imgUrl: 'https://a0.muscache.com/im/pictures/miso/Hosting-645296454281775108/original/0f239c43-72fc-44b1-b917-902bc9f4f9e1.jpeg?im_w=1200',
            content: utilService.makeLorem(8),
            creactedAt: Date.now(),
            price: 203,
        },
        {
            _id: utilService.makeId(8),
            title: `C -${utilService.makeLorem(1)} `,
            imgUrl: 'https://a0.muscache.com/im/pictures/8893b388-313b-4f45-ae5d-51d4fdc3f443.jpg?im_w=1200',
            content: utilService.makeLorem(8),
            creactedAt: Date.now(),
            price: 2051,
        },


    ]

    return items
}
async function addItems(item) {
    //    const items= utilService.loadFromStorage(Item_DB )||[]
    const data = await storageService.post(Item_DB, item)
    return data
}
function getEmptyItem() {
    return {
        _id: utilService.makeId(8),
        creactedAt: '',
        title: "",
        imgUrl: '',
        content: "",
    }
}


async function getItems(filterBy = { title: '', price: '', content: '',sortBy:'' }) {
    try {
        // const Items = await httpService.get('coures')
        
        let items = await storageService.query(Item_DB)
        const { title, price, content,sortBy } = filterBy
        
        var itemsToReturn
        if (title) {
            const regex = new RegExp(title, 'i')
            items = items.filter(item => regex.test(item.title))
            
        }
        if (price) {
            items = items.filter(item => item.price < price)
        }
        if (content) {
            items = items.filter(item => item.content.includes(content))
        }
        if(sortBy){
            console.log('in item service sort by : ', sortBy);
            
            if(sortBy==='price'){
                const sortedItems =  items.sort((a, b)=> {return a.price-b.price})
                console.log('in item service sortedItems: ', sortedItems);
                return sortedItems
                
            }
            if(sortBy === 'title' ){
                return  sort(items)

            }
        }
        
            return items
            
    }
    catch (err) {
        console.log('could not load Items', err);
        
    }
}

async function getItemById(couresId) {
    try {
        // const coures = await httpService.get(`coures/${couresId}`)
        const items = await storageService.query(Item_DB)
        const item = items.find(item => item._id === couresId)
        console.log('your Item by id in service ', item);
        return item
    }
    catch (err) {
        console.log('could not load item by id ', err);

    }
}
async function addComment(announcId, commentToAdd) {
    try {
        const item = await getItemById(announcId)
        if (item) {
            item.comments.push(commentToAdd)
            await updateItem(item)
            return item
        }
    } catch (err) {
        console.log('err could not add comment', err);

    }

}
async function updateItem(itemToUpdate) {
    try {
        const item = storageService.put(Item_DB, itemToUpdate)
        return item
    }
    catch (err) {
        console.log('could not _update Item ', err);
    }
}
async function getEmptyFilterBy() {
   
        return {
            title:"",
            price:0,
            content:'',
        }
    
    
}
function sort(arr) {
    return arr.sort((a, b) => {
        if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
            return -1;
        }
        if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) {
            return 1;
        }
        
        return 0;
    })
}