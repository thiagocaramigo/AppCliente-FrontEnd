import * as React from 'react'
import { Image, ScrollView } from 'react-native';
import { View, Text } from 'react-native'
import { servidor } from '../config/Path';
import { styles } from '../css/Styles';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Atualizar from './Atualizar';


const Stack = createNativeStackNavigator();
let rs = "";
export default function Home({route}){
    const {dados} = route.params;
    rs = dados[2];
    return(
        <NavigationContainer independent={true}>
            <Stack.Navigator>
                <Stack.Screen name="TelaHome" component={TelaHome}/>
                <Stack.Screen name="Atualizar" component={Atualizar}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}


 function TelaHome({navigation}) {
    
    console.log(`Dados na Home ->${rs}`);

    const[lstClientes,setLstClientes] = React.useState([]);


    React.useEffect(()=>{
        fetch(`${servidor}`,{
            method:'GET',
            headers:{
                accept: 'application/json',
                'content-type':'application/json',
                'token': rs,
            },
        })
        .then((response)=>response.json())
        .then((result)=>{
            console.log(result);
            setLstClientes(result.output);
        })
        .catch((erro)=>console.error(`Erro ao ler a api -> ${erro}`))
        
    },[])


    return(
        <View style={styles.container}>

        <ScrollView horizontal={false} style={styles.scroll}>
            <Image source={{uri:"https://cakeerp.com/wp-content/uploads/2017/04/11.06-Como-manter-um-relacionamento-duradouro-com-seu-cliente-01-1080x675.jpg"}} style={styles.imgcliente}/>
            <View>
                {
                    lstClientes.map((item,index)=>(
                        <View style={styles.cliente} key={index}>
                            <Text style={styles.nome}>Nome:{item.nome}</Text>
                            <Text style={styles.cpf}>CPF:{item.cpf}</Text>
                            <Text style={styles.email}>E-mail:{item.email}</Text>
                            <Text style={styles.usuario}>Usuário{item.usuario}</Text>
                            <TouchableOpacity onPress={()=>{
                                navigation.navigate("Atualizar",{cliente: item,token:rs });
                            }}>
                            <Feather name="edit" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    ))
                }
            </View>
        </ScrollView>    
        </View>
    );
}