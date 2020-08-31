//actioncreator 
import {DELETE} from './actionTypes'
import {ATTENTION} from './actionTypes'
import {FOCUS} from './actionTypes'
const deleteAction=(index) => ({
    type:DELETE,
    payload:index
})

const attentionAction=(id) =>({
    type:ATTENTION,
    id
})
const FocusAction=(id) =>({
    type:FOCUS,
    id
})

export{
    deleteAction,
    attentionAction,
    FocusAction,
   
}
