import {Product} from "../api/ProductApi";
import React, {useState} from "react";
import {Form, Item, Label, Input, Button, Text, Textarea, Picker, Icon} from 'native-base';
import {View} from "react-native";

export interface ProductFormProps {
    initialData?: Product;
    onSubmit: (product: Product) => void;
}

//Form has simple example of field validation (for name)
//but it can be done cleaner and more nicely
export function ProductForm(props: ProductFormProps) {

    const initialData = props.initialData || {name: '', id: '-1', quantity: 1, quantityUnit: 'szt', description: ''};
    const [name, setName] = useState(initialData.name || '');
    const [quantity, setQuantity] = useState(initialData.quantity || 0);
    const [quantityUnit, setQuantityUnit] = useState(initialData.quantityUnit || 'szt');
    const [description, setDescription] = useState(initialData.description || '');
    const [nameErr, setNameErr] = useState(false);
    const [errText, setErrText] = useState('');
    const handleSubmit = () => {
        if(name == null || name.length == 0) {
            console.log('empty name');
            setNameErr(true);
            setErrText('Name cannot be empty!');
            return;
        }
        const id = initialData.id || null;
        props.onSubmit({id, name, quantityUnit, quantity, description})
    };


    return (<React.Fragment>
        <Text style={{color: '#f00'}}>{errText}</Text>
        <Form style={{paddingBottom: 20}}>
            <Item error={nameErr} stackedLabel>
                <Label>Name</Label>
                <Input value={name} onChangeText={val => {
                    setName(val);
                    if(val.length > 0) {    //reset error when typing
                        setErrText('');
                        setNameErr(false);
                    }
                }}/>
            </Item>
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'stretch'}}>
                <Item stackedLabel style={{flex: 1}}>
                    <Label>Quantity</Label>
                    <Input keyboardType="numeric" value={quantity.toString()} onChangeText={val => {
                        const num = parseInt(val);
                        setQuantity(isNaN(num) ? 0 : num);
                    }}/>
                </Item>
                <Item picker>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Unit"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        selectedValue={quantityUnit}
                        onValueChange={setQuantityUnit}
                    >
                        <Picker.Item label="Szt." value="szt" />
                        <Picker.Item label="Litry" value="L" />
                        <Picker.Item label="Kilogramy" value="kg" />
                    </Picker>
                </Item>
            </View>
            <Textarea rowSpan={5} bordered underline={true}
                      placeholder="Description"
                      value={description}
                      onChangeText={t => setDescription(t)}/>
        </Form>
        <Button primary onPress={handleSubmit}><Text>Save</Text></Button>
    </React.Fragment>);
}
