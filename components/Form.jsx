import {View, Text, Pressable, StyleSheet ,TextInput ,Modal} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'


const Form = () =>{

    const [storage, setStorage] = useState([])
    const [value, setValue] = useState('')
    const [string, setString] = useState('')

    const [show, setShow] = useState(false)

    const onChangeInput = (dato) =>{
        setValue(dato)
        
    }
    useEffect(()=>{
        async function showData(){
            let data
            try{
                data = JSON.parse(await AsyncStorage.getItem('@storage'))
                setStorage(Object.values(data))
                setString(storage.toString())
            }catch(err){
                setStorage([])
            }   
        }
        showData()
    },[])

    useEffect(()=>{
        if(storage.length != 0){
            sendStorage()
        }
        
    },[storage])


    const sendStorage = async() =>{
        let data={}
        storage.forEach((value, index)=>{
            data ={
                ...data,
                [index]:value
            }
        })
        console.log(data)
        try{
            console.log(storage.length)
            console.log(storage)
            await AsyncStorage.setItem('@storage',JSON.stringify(data))
            
        }catch(err){
            console.log(err)
        }
    }
    const onPressValue = () =>{
        
        setStorage([...storage, value])
        setValue('')
    }

    const showModal = () =>{
        setShow(true)
        let data
        async function getStorage (){
            try{
                data = JSON.parse(await AsyncStorage.getItem('@storage'))
                setStorage(Object.values(data))
                setString(storage.toString())
                
            }catch(err){
                console.log(err)
                setString("")
            }
            
        }
        getStorage()
    
    }

    const deleteStorage = () =>{
        setStorage([])
        async function deleteS () {
            try{
                await AsyncStorage.setItem('@storage', "")
                setStorage([])
            }catch(err){
                console.log(err)
            }
        }

        deleteS()
    }

    return(
        <View style={styles.input}>
            <TextInput 
            placeholder='introduce una palabra'
            onChangeText={(dato)=>onChangeInput(dato)}
            value={value}
            style={styles.inputText}/>
            

            <View style={styles.buttonBox}>
                <Pressable style={styles.inputButton} onPress={()=>onPressValue()}>
                    <Text style={{color:"white", textAlignVertical:"center" ,width:"100%"}}>Guardar</Text>
                </Pressable>
                <Pressable style={styles.showModal} onPress={()=>showModal()}>
                    <Text style={{color:"white" }}>mostrar</Text>
                </Pressable>
                <Pressable style={styles.inputButton}onPress={deleteStorage}>
                        <Text>borrar</Text>
                </Pressable>
            </View>
            <Modal  visible={show} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modal}>
                        {
                            string !== '' ?
                            <Text> soy un modal: {string}</Text>
                            :<Text>cargando</Text>
                        }
                        
                        <Pressable style={styles.buttonExit} onPress={()=> setShow(false)} >
                            <Text>salir</Text>
                        </Pressable>
                    
                        
                    </View>
                </View>
                
            </Modal>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        backgroundColor:"#26c6da",
        width:"60%",
        padding:20,
        borderRadius:10
    },
    inputText:{
        marginBottom:20
    },
    inputButton:{
        height:20,
        width:"30%",
        backgroundColor:"red",
    },
    showModal:{
        backgroundColor:"blue",
        width:"30%",
        marginLeft:10,
        marginRight:10,
        height:20
    },
    modalContainer:{
       
        justifyContent:"center",
        alignItems:"center"
    },
    buttonBox:{
        flexDirection:"row",
        justifyContent:"space-around"
    },
    buttonExit:{
        marginTop:10,
        backgroundColor:"red",
        width:"20%"
    },
    modal:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#006064",
        width:"50%",
        height:"50%"
    }
})

export default Form