import React, { Component } from 'react'
import { Container, Content, Icon } from 'native-base';
import { View, Text, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView, TextInput, Alert, Platform, Linking } from 'react-native';
import Logo from '../../assets/images/demo.png'
import { RegEx } from '../../config/AppConfig';
import styles from '../../style';
import auth from '@react-native-firebase/auth'
import { connect } from 'react-redux'
import { logged } from '../../storage/action'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            errorTextinput: false,
            disableCTA: true,
            mobileoremail: "",
            isFocusOnTextbox: false,
            isFocusOnPass: false,
            toggleShowPass: true,
            showPass: false,
            password: '',
            errorPassword: false,
            toggleShowConfirmPass: true,
            showConfirmPass: false,
            confirmPassword: '',
            errorConfirmPassword: false,
            wrongPasswordModal: false,
            loginModalVisible: false,
            errorMessage: '',
            loggedIn: props.loggedIn,
            isConnected: props.isConnected,
            autoSync: props.autoSync,
            fcmToken: props.fcmToken,
            stage : props.stage,
            jobRequestId : props.jobRequestId,
        }
    }

    componentDidMount() {
        this.checkLogin();
    }

    checkLogin = () => {
        if (this.state.loggedIn) {
        }
    }

    targetEmailText = enteredValue => {
        if (enteredValue && RegEx.email.test(enteredValue)) {
            //valid Email hence Call the API.
            this.setState({
                mobileoremail: enteredValue,
                disableCTA: true
            });
        } else {
            this.setState({
                mobileoremail: enteredValue,
                disableCTA: true
            });
        }
    };


    loginModalVisiblity = () => {
        this.setState({
            loginModalVisible: true
        });
        setTimeout(() => {
            this.setState({
                loginModalVisible: false
            });
            this.navigatetoOTP();
        }, 2500);
    }

    navigatetoOTP = () => {
        // this.props.navigation.navigate("OtpPage", { isForgotPass: false, username: this.state.mobileoremail })
    }

    onFocusTxt = () => {
        this.setState({ isFocusOnTextbox: true, errorTextinput: false });
    };

    offFocusTxt = enteredEmail => {
        if (enteredEmail && RegEx.email.test(enteredEmail)) {
            this.setState({ errorTextinput: false, disableCTA: this.state.password != '' && this.state.password == this.state.confirmPassword  ? false : true, isFocusOnTextbox: false });
        } else if (!enteredEmail || enteredEmail.length == 0) {
            this.setState({ errorTextinput: false, disableCTA: true, isFocusOnTextbox: false });
        } else {
            this.setState({ errorTextinput: true, disableCTA: true, isFocusOnTextbox: false });
        }
    };

    notifyMessage = (error) => {
        this.setState({
            wrongPasswordModal: true,
            errorMessage: error
        });
        setTimeout(() => {
            this.setState({
                wrongPasswordModal: false
            });
        }, 1500);
    }

    validatePassword = (pass) => {
        if (pass.length > 0 && RegEx.password.test(pass)) {
            this.setState({
                password: pass,
                showPass: true,
                disableCTA: this.state.password === this.state.confirmPassword && !this.state.errorTextinput && !this.state.mobileoremail != ''? false :true 
            })
        }
        else {
            this.setState({
                password: pass.substring(0, pass.length - 1),
                password: pass,
                showPass: true,
                disableCTA: true
            })
        }
    }

    callLoginApi = async () => {
        let {mobileoremail, password} = this.state
        try {
            let response = await auth().createUserWithEmailAndPassword(mobileoremail, password)
            if (response) {
              console.log("response", response)
              this.props.logged(response.user._user)
            }
          } catch (e) {
            console.error(e.message)
          }
    }

    onFocusPass = () => {
        this.setState({ errorPassword: false, isFocusOnPass: true });
    }

    offFocusPass = (pass) => {
        if (pass && RegEx.password.test(pass)) {
            this.setState({ isFocusOnPass: false, errorPassword: false, disableCTA: this.state.password === this.state.confirmPassword && !this.state.errorTextinput && !this.state.mobileoremail != ''? false :true });
        } else if (!pass || pass.length == 0) {
            this.setState({ isFocusOnPass: false, errorPassword: false, disableCTA: true });
        } else {
            this.setState({ isFocusOnPass: false, errorPassword: true, disableCTA: true });
        }
    }

    togglePass = () => {
        this.setState({
            toggleShowPass: !this.state.toggleShowPass,
            errorPassword: false

        })
    }

    validateConfirmPassword = (pass) => {
        if (pass.length > 0 &&  pass== this.state.password ) {
            this.setState({
                confirmPassword: pass,
                showConfirmPass: true,
                disableCTA: this.state.password === this.state.confirmPassword && !this.state.errorTextinput && !this.state.mobileoremail != ''? false :true 
            })
        }
        else {
            this.setState({
                confirmPassword: pass,
                showConfirmPass: true,
                disableCTA: true
            })
        }
    }

    onFocusConfirmPass = () => {
        this.setState({ errorConfirmPassword: false, isFocusOnConfirmPass: true });
    }

    offFocusConfirmPass = (pass) => {
        if (pass && pass==this.state.password) {
            this.setState({ isFocusOnConfirmPass: false, errorConfirmPassword: false, disableCTA: this.state.password === this.state.confirmPassword && !this.state.errorTextinput && this.state.mobileoremail !=''? false :true  });
        } else if (!pass || pass.length == 0) {
            this.setState({ isFocusOnConfirmPass: false, errorConfirmPassword: false, disableCTA: true });
        } else {
            this.setState({ isFocusOnConfirmPass: false, errorConfirmPassword: true, disableCTA: true });
        }
    }

    toggleConfirmPass = () => {
        this.setState({
            toggleShowConfirmPass: !this.state.toggleShowConfirmPass,
            errorConfirmPassword: false

        })
    }

    render() {
        return (
            <Container>
                    <View style ={{backgroundColor :'#c3c3c3', height :50,flexDirection :'row',alignItems:'center'}}>
                        <Text style={{left :15, fontSize :28,flex:1}} onPress={()=>this.props.navigation.goBack()}>X</Text>
                        <Text style={styles.signup_header}>Register page</Text>
                    </View>
                    <Content ref={c => this._content = c}>
                        <View style={styles.signup_wrapper}>
                        <   View style={styles.signup_imageView}>
                                <Image source={Logo} style={styles.signup_image_path} />
                            </View>
                            <View style={styles.signup_userNameDiv}>
                                <View style={styles.login_lowerDiv}>
                                    <View width={"100%"}>
                                        <Text style={styles.userName_div}>
                                            Email
                             </Text>
                                        <TouchableOpacity style={styles.userNameDiv_section}>
                                            <KeyboardAvoidingView
                                                width={"100%"}
                                                behavior="padding"
                                                enabled
                                                style={styles.userName_login}
                                            >
                                                <TextInput
                                                    selectionColor={"#4d5054"}
                                                    defaultValue={this.state.mobileoremail}
                                                    onFocus={() => this.onFocusTxt()}
                                                    onBlur={() => this.offFocusTxt(this.state.mobileoremail)}
                                                    maxLength={256}
                                                    placeholder="Username"
                                                    autoCapitalize="none"
                                                    placeholderTextColor="grey"
                                                    editable={true}
                                                    onChangeText={mobileoremail =>
                                                        this.targetEmailText(mobileoremail.toLowerCase())
                                                    }
                                                    style={[styles.userName_inbox,
                                                    {
                                                        borderColor: this.state.isFocusOnTextbox
                                                            ? "#800000"
                                                            : "#4d5054"
                                                    }
                                                    ]}
                                                />
                                            </KeyboardAvoidingView>
                                        </TouchableOpacity>

                                        {this.state.errorTextinput === true ? (
                                            <View>
                                                <Text style={styles.invalid_email}>
                                                    Invalid Email Address
                               </Text>
                                            </View>
                                        ) : (
                                                <View />
                                            )}
                                    </View>
                                    <View style={{}}>
                                        <View style={styles.invalid_padding}>
                                            <View>
                                                <Text style={styles.password_text}>Password</Text>
                                                <View style={styles.password_input}>
                                                    <TextInput maxLength={20}
                                                        style={[styles.password_inText, { borderColor: this.state.isFocusOnPass ? '#800000' : '#4d5054' }]}
                                                        secureTextEntry={this.state.toggleShowPass} placeholder="Password"
                                                        placeholderTextColor="grey"
                                                        autoCapitalize="none"
                                                        selectionColor={"#4d5054"}
                                                        maxLength={32}
                                                        onChangeText={(text) => this.validatePassword(text)}
                                                        onFocus={() => this.onFocusPass()}
                                                        onBlur={() => this.offFocusPass(this.state.password)}
                                                    />
                                                    {this.state.showPass ?
                                                        <View style={styles.show_pwd}>
                                                        {this.state.toggleShowPass ?
                                                            <Text onPress={() => { this.togglePass() }}  style={styles.position_abs}>show</Text>
                                                            :
                                                            <Text onPress={() => { this.togglePass() }}  style={styles.position_abs}>hide</Text>
                                                        }
                                                    </View>
                                                        : <View></View>
                                                    }
                                                </View>
                                            </View>

                                        </View>

                                        {this.state.errorPassword ?
                                            <View style={styles.error_pwd}>
                                                <Text style={styles.error_password}>
                                                    Minimum 8 characters & 1 special character required
                                           </Text>
                                            </View> : <View></View>
                                        }
                                    </View>
                                    <View style={{}}>
                                        <View style={styles.invalid_padding}>
                                            <View>
                                                <Text style={styles.password_text}>Confirm password</Text>
                                                <View style={styles.password_input}>
                                                    <TextInput maxLength={20}
                                                        style={[styles.password_inText, { borderColor: this.state.isFocusOnConfirmPass ? '#800000' : '#4d5054' }]}
                                                        secureTextEntry={this.state.toggleShowConfirmPass} placeholder="Password"
                                                        placeholderTextColor="grey"
                                                        autoCapitalize="none"
                                                        selectionColor={"#4d5054"}
                                                        maxLength={32}
                                                        onChangeText={(text) => this.validateConfirmPassword(text)}
                                                        onFocus={() => this.onFocusConfirmPass()}
                                                        onBlur={() => this.offFocusConfirmPass(this.state.confirmPassword)}
                                                    />
                                                    {this.state.showConfirmPass ?
                                                        <View style={styles.show_pwd}>
                                                        {this.state.toggleShowConfirmPass ?
                                                            <Text onPress={() => { this.toggleConfirmPass() }}  style={styles.position_abs}>show</Text>
                                                            :
                                                            <Text onPress={() => { this.toggleConfirmPass() }}  style={styles.position_abs}>hide</Text>
                                                        }
                                                    </View>
                                                        : <View></View>
                                                    }
                                                </View>
                                            </View>

                                        </View>

                                        {this.state.errorConfirmPassword ?
                                            <View style={styles.error_pwd}>
                                                <Text style={styles.error_password}>
                                                    Password mis-match
                                           </Text>
                                            </View> : <View></View>
                                        }
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Content>
                    <View style={styles.privacy_text_term}>
                        <TouchableOpacity
                            disabled={this.state.disableCTA}
                            onPress={() => this.callLoginApi()}
                            style={[styles.button_disable,
                            {
                                backgroundColor: this.state.disableCTA
                                    ? "#babcbf"
                                    : "#000"
                            }]
                            }
                        >
                            <Text style={[styles.continue_text, { color: this.state.disableCTA ? 'black' : 'white' }]}>Continue</Text>
                        </TouchableOpacity>
                    </View>
            </Container>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logged: profile => dispatch(logged(profile)),
    };
};

export default connect(null, mapDispatchToProps)(SignUp)