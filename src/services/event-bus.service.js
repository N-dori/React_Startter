// // בס"ד

export const SHOW_MSG = 'show-msg'

// function createEventEmitter() {
//     const listenersMap = {}
//     return {
//         on(evName, listener){
//             listenersMap[evName] = (listenersMap[evName])? [...listenersMap[evName], listener] : [listener]
//             return ()=>{
//                 listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
//             }
//         },
//         emit(evName, data) {
//             if (!listenersMap[evName]) return
//             listenersMap[evName].forEach(listener => listener(data))
//         }
//     }
// }

// export const eventBus = createEventEmitter()
// export const eventBusService = { on, emit }
// export function showUserMsg(msg) {
//     eventBus.emit('show-msg', msg)
// }

// export function showSuccessMsg(txt) {
//     showUserMsg({txt, type: 'success'})
// }
// export function showErrorMsg(txt) {
//     showUserMsg({txt, type: 'error'})
// }

// בס"ד

// 'use strict'

function createEventEmitter(defaultHandler = null) {
    const listenersMap = {}

    return {
        on(evName, listener) {
            listenersMap[evName] = listenersMap[evName] ? [...listenersMap[evName], listener] : [listener]
            return () => listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
        },
        emit(evName, payload) {
            if (listenersMap[evName]) listenersMap[evName].forEach(listener => listener(payload))
            else if (defaultHandler) defaultHandler()
        }
    }
}
export const eventBus = createEventEmitter(() => console.log('No handler associated with this event...'))

// const map = {
//     'user-msg': [func1, func2],
//     'test-event': [func3],
// }
export const eventBusService = { on, emit }

function on(eventName, listener) {
    const callListener = ({ detail }) => {
        listener(detail)
    }
    window.addEventListener(eventName, callListener)
    // Returning the unsubscribe function:
    return () => {
        window.removeEventListener(eventName, callListener)
    }
}

function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }))
}

// export const eventBus = createEventEmitter()
// esxport const eventBusService = { on, emit }
export function showUserMsg(msg) {
    eventBus.emit(SHOW_MSG, msg)
}

export function showSuccessMsg(txt) {
    showUserMsg({ txt, type: 'success' })
}
export function showErrorMsg(txt) {
    showUserMsg({ txt, type: 'error' })
}