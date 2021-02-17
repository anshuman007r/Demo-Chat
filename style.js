import { StyleSheet, Platform, Dimensions } from 'react-native'
const { width, height } = Dimensions.get("window");
import { heightPercentageToDP, widthPercentageToDP } from '../demochat/consts';
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    login_wrapper: {

    },
    signup_wrapper: {
        height:deviceHeight, justifyContent :'center'
    },
    homepage_wrapper :{
        flex :1, justifyContent:'center',alignItems:'center'
    },
    login_imageView: {
        alignItems: 'center', flex: 2, justifyContent: 'center', marginVertical : 50
    },
    signup_imageView: {
        alignItems: 'center', flex: 0.6, justifyContent: 'center', marginVertical : 50
    },
    login_image_path: {
        width: widthPercentageToDP(60), height: widthPercentageToDP(60)
    },
    signup_image_path: {
        width: widthPercentageToDP(30), height: widthPercentageToDP(30)
    },
    signup_header:{
        fontSize :22,fontFamily: 'WorkSans-Regular',flex:2
    },
    chat_header:{
        fontSize :22,fontFamily: 'WorkSans-Regular',flex:2.4
    },
    homepage_header:{
        flex : 2
    },
    homepage_text:{
        fontSize :22,fontFamily: 'WorkSans-Regular', alignSelf:'center'
    },
    login_userNameDiv: {
        elevation: 10, flex: 1, borderTopLeftRadius: 20, borderTopRightRadius: 20, justifyContent: 'space-between', flexDirection: 'column'
    },
    signup_userNameDiv: {
         flex: 2.5, justifyContent: 'space-between', flexDirection: 'column'
    },
    login_lowerDiv: {
        padding: 16, borderRadius: 15, margin: heightPercentageToDP(2)
    },
    userName_div: {
        textAlign: 'left', color: "#000", fontSize: 16, fontFamily: 'WorkSans-Regular'
    },
    userNameDiv_section: {
        marginTop: heightPercentageToDP(1)
    },
    userName_inbox: {
        paddingLeft: 15, backgroundColor: '#e4e4e4', color: '#000', fontFamily: 'WorkSans-Regular', fontSize: 16, borderRadius: 8, borderWidth: 1, width: '100%', height: 48
    },
    invalid_email: {
        fontSize: 11, color: '#FF4500', marginTop: 2, fontFamily: "WorkSans-Medium"
    },
    invalid_padding: {
        paddingTop: heightPercentageToDP(2)
    },
    password_inText: {
        backgroundColor: '#e4e4e4', fontFamily: 'WorkSans-Regular', color: '#000', paddingLeft: 15, fontSize: 16, borderRadius: 8, borderWidth: 1, width: '100%', height: 48
    },
    password_text: {
        textAlign: 'left', color: "#000", fontSize: 16, fontFamily: 'WorkSans-Regular'
    },
    forgot_pwd: {
        alignItems: 'flex-end', marginTop: 8
    },
    forgot_pw_text: {
        color: '#632220', fontSize: 12, fontFamily: 'WorkSans-Regular'
    },
    position_abs: {
        position: "absolute", right: 5
    },
    show_pwd: {
        position: 'absolute', flexWrap: 'wrap-reverse', right: widthPercentageToDP(5), top: 15
    },
    password_input: {
        justifyContent: 'center', alignItems: 'center', marginTop: heightPercentageToDP(1)
    },
    error_pwd: {
        flexDirection: 'row', justifyContent: 'flex-start', marginTop: 8
    },
    error_password: {
        fontFamily: "WorkSans-Medium", fontSize: 11, color: '#FF4500', fontFamily: 'WorkSans-Regular'
    },
    privacy_text_term: {
        alignItems: 'center', justifyContent :'center', height :60,
    },
    button_disable: {
        width: '90%', height: 48, marginTop: 0, borderRadius: 5, alignItems: 'center', justifyContent: 'center'
    },
    continue_text: {
        fontSize: 16, fontFamily: 'WorkSans-SemiBold'
    },
}) 