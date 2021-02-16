import React, { Component } from 'react'
import { Container, Content, Icon } from 'native-base';
import { View, Text, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView, TextInput, Alert, Platform, Linking } from 'react-native';
import Logo from '../../assets/images/Image/PNG/demo.png'
import styles from '../../style';
import { connect } from 'react-redux'
import { loggedOut } from '../../storage/action'
class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    callLogout = () =>{
        this.props.loggedOut()
        this.props.navigation.navigate('LoginPage')
    }


    render() {
        return (
            <Container>
                    <View style ={{backgroundColor :'#c3c3c3', height :50,justifyContent:'center',alignItems :'center'}}>
                        <Text style={styles.homepage_header}>Home page</Text>
                    </View>
                    <Content ref={c => this._content = c} scrollEnabled={false}>
                        <View style={styles.homepage_wrapper}>
                        <   View style={styles.signup_imageView}>
                                <Image source={Logo} style={styles.signup_image_path} />
                            </View>
                        </View>
                        <View style ={{flex :3, alignItems :'center'}}>
                            <TouchableOpacity
                                onPress={() => this.callLogout()}
                                style={[styles.button_disable,
                                {
                                    backgroundColor
                                        : "#000"
                                }]
                                }
                            >
                                <Text style={[styles.continue_text, { color: 'white' }]}>Log out</Text>
                            </TouchableOpacity>
                        </View>
                    </Content>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loggedOut: () => dispatch(loggedOut()),
    };
};

export default connect(null, mapDispatchToProps)(HomePage)