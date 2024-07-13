package com.example.bethedonor.viewmodels

import android.util.Log
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import com.example.bethedonor.data.uievent.LoginUIEvent
import com.example.bethedonor.data.uistate.LoginUiState
import com.example.bethedonor.data.validationRules.Validator

class LoginViewModel() : ViewModel() {
    private val TAG = LoginViewModel::class.simpleName

    var loginUIState = mutableStateOf(LoginUiState())
    var requestInProgress = mutableStateOf(false)
    fun onEvent(event: LoginUIEvent) {
        when (event) {
            is LoginUIEvent.EmailValueChangeEvent -> {
                loginUIState.value = loginUIState.value.copy(
                    emailId = event.emailId,
                    emailIdErrorState = Validator.validateEmailId(event.emailId)
                )
            }

            is LoginUIEvent.PasswordValueChangeEvent -> {
                loginUIState.value = loginUIState.value.copy(
                    password = event.password,
                    passwordErrorState = Validator.validatePassword(event.password)
                )
            }

            LoginUIEvent.RegistrationButtonClick -> {
                printState()
            }
        }
    }

    fun validateWithRulesForLogIn(): Boolean {
        return loginUIState.value.emailIdErrorState.status
                && loginUIState.value.passwordErrorState.status
    }

    fun printState() {
        Log.d(TAG, "Inside_printState")
        Log.d(TAG, loginUIState.value.toString())
    }

//    fun login(
//        onProcessResult: (status: Boolean, message: String, isUnverifiedEmail: Boolean) -> Unit,
//        dataBase: FirebaseFirestore
//    ) {
//        printState()
//        loginUser(
//            email = loginUIState.value.emailId,
//            password = loginUIState.value.password,
//            onProcessResult = onProcessResult,
//            dataBase = dataBase
//        )
//    }

//    private fun loginUser(
//        email: String,
//        password: String,
//        onProcessResult: (status: Boolean, message: String, isUnverifiedEmail: Boolean) -> Unit,
//        dataBase: FirebaseFirestore
//    ) {
//        requestInProgress.value = true
//        val auth = FirebaseAuth.getInstance()
//        auth.currentUser?.reload()
//        //-------
//
//        auth.signInWithEmailAndPassword(email, password)
//            .addOnCompleteListener {
//                Log.d(
//                    "SignIn",
//                    "${auth.currentUser?.email} is verified ${auth.currentUser?.isEmailVerified}"
//                )
//                if (it.isSuccessful) {
//                    val user = auth.currentUser
//                    Log.d(
//                        "signInWithEmailAndPassword",
//                        "Input:$email and currentUser:${user?.email}"
//                    )
//                    if (user != null) {
//                        val userId = user.uid
//                        dataBase.collection("users").document(userId)
//                            .get()
//                            .addOnSuccessListener { document ->
//                                Log.d("document", "$document")
//                                if (document != null) {
//                                    val isAdmin = document.getBoolean("admin") ?: true
//                                    Log.d(
//                                        "AdminSignIn",
//                                        "UserId:${user.uid} isAdmin ${document.getBoolean("admin")}"
//                                    )
//                                    // Now you can check if the user is admin or not
//                                    if (!isAdmin) {
//                                        if (user.isEmailVerified) {
//                                            onProcessResult(
//                                                true,
//                                                "Successfully loged in",
//                                                false
//                                            )
//                                        } else {
//                                            onProcessResult(
//                                                false,
//                                                "Please Verify the Email ID",
//                                                true
//                                            )
//                                        }
//                                    } else {
//                                        onProcessResult(
//                                            false,
//                                            "No User Found with this credentials!",
//                                            false
//                                        )
//                                    }
//
//                                } else {
//                                    onProcessResult(
//                                        false,
//                                        "No User Found with this credentials!",
//                                        false
//                                    )
//                                }
//                            }
//                            .addOnFailureListener { it ->
//                                onProcessResult(
//                                    false,
//                                    it.message.toString(),
//                                    false
//                                )
//                            }
//                    }
//                } else {
//                    onProcessResult(false, it.exception?.message.toString(), false)
//                }
//                requestInProgress.value = false
//            }
//    }
//
//    //    fun signOut() {
////        val auth = FirebaseAuth.getInstance()
////        auth.signOut()
////        resetUiState()
////    }
//    fun sendEmailVerification(
//        mainViewModel: MainViewModel,
//        onProcessResult: (status: Boolean, message: String) -> Unit
//    ) {
//        val auth = FirebaseAuth.getInstance()
//        mainViewModel.sendVerificationEmail(auth.currentUser, onProcessResult)
//    }

    fun resetUiState() {
        loginUIState.value = LoginUiState()
    }
}