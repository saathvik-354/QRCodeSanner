import React from 'react';
import { Text, View ,TouchableOpacity,StyleSheet } from 'react-native';
import *as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';


export default class TransactionScreen extends React.Component {
  constructor(){
  super();
  this.state={
   hasCamerapermission:null,
   scanned:false,
   scannedData:'',
  buttonState:'normal',
  }
   }
   getCamerapermissions=async()=>{
     const {status}=await permissions.askAsync(permissions.CAMERA)
     this.setState({
       hasCamerapermission:status === 'granted',
       buttonState:'clicked',
       scanned:false
     })
   }
   handleBarcodeScan=async({type,data})=>{
     this.setState({
       scanned:true,
       scannedData:data,
       buttonState:'normal',

     })
   }
    render() {
      const hasCamerapermission=this.state.hasCamerapermission;
      const scannedData=this.state.scanned;
      const buttonState=this.state.buttonState;
      if(buttonState==='clicked' && hasCamerapermission){
        return(
          <BarCodeScanner
          onBarcodeScanned={scanned?undefined:this.handleBarcodeScan}
          style={StyleSheet.absoluteFillObject}
          />
        )
      }
      else if(buttonState==='normal'){

      
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.displayText}>{hasCamerapermission===true?this.state.scannedData:'Request Camera Permission'}</Text>
          <TouchableOpacity style={styles.scanButton} onPress={this.getCamerapermissions}>
          <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles=StyleSheet.create({
  displayText:{
    fontSize:15,
    textDecorationLine:'underline',
  },
  scanButton:{
    backgroundColor:'#2196f3',
    padding:10,
    margin:10,
  },
  buttonText:{
    fontSize:20,
    
  }
})




