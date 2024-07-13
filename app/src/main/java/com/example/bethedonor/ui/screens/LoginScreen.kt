package com.example.bethedonor.ui.screens

import android.util.Log
import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Password
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Scaffold
import androidx.compose.material3.SnackbarDuration
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.material3.SnackbarResult
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import com.example.bethedonor.data.uievent.LoginUIEvent
import com.example.bethedonor.navigation.Destination
import com.example.bethedonor.ui.components.ButtonComponent
import com.example.bethedonor.ui.components.EditText
import com.example.bethedonor.ui.components.ForgotPassword
import com.example.bethedonor.ui.components.GreetingText
import com.example.bethedonor.ui.components.PasswordFiled
import com.example.bethedonor.ui.components.SimpleTextWithSpan
import com.example.bethedonor.ui.components.SubGreetText
import com.example.bethedonor.ui.theme.Gray1
import com.example.bethedonor.ui.theme.fadeBlue1
import com.example.bethedonor.ui.theme.fadeBlue2
import com.example.bethedonor.ui.theme.teal
import com.example.bethedonor.viewmodels.LoginViewModel
import kotlinx.coroutines.launch

@Composable
fun LoginScreen(
    navController: NavHostController = NavHostController(LocalContext.current),
    loginViewModel: LoginViewModel = viewModel()
) {
    val context = LocalContext.current
    var recheckFiled by remember {
        mutableStateOf(false)
    }

    val scope = rememberCoroutineScope()
    val snackbarHostState = remember { SnackbarHostState() }

    Scaffold(
        snackbarHost = {
            SnackbarHost(hostState = snackbarHostState)
        }) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize(), contentAlignment = Alignment.Center
        ) {
            Surface(
                modifier = Modifier
                    .fillMaxSize()
            ) {
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .background(
                            brush = Brush.linearGradient(
                                colors = listOf(fadeBlue1, fadeBlue2),
                                start = Offset.Zero,
                                end = Offset.Infinite
                            )
                        ), contentAlignment = Alignment.Center
                )
                {
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        verticalArrangement = Arrangement.SpaceEvenly,
                        modifier = Modifier
                            .padding(vertical = 20.dp, horizontal = 20.dp)
                            .fillMaxWidth()
                    ) {
                        Box(
                            modifier = Modifier.fillMaxWidth(),
                            contentAlignment = Alignment.Center
                        ) {
                            Column(
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.Center
                            ) {
                                GreetingText()
                                Spacer(modifier = Modifier.size(8.dp))
                                SubGreetText(text = "Welcome Back")
                                Spacer(modifier = Modifier.size(20.dp))
                                EditText(
                                    label = "Email-id",
                                    labelIcon = Icons.Filled.Email,
                                    onFiledValueChanged = {
                                        loginViewModel.onEvent(LoginUIEvent.EmailValueChangeEvent(it))
                                        loginViewModel.printState()
                                        loginViewModel.loginUIState.value.emailIdErrorState
                                    },
                                    recheckFiled = recheckFiled
                                )
                                PasswordFiled(
                                    "Password",
                                    Icons.Filled.Password,
                                    true,
                                    onFiledValueChanged = {
                                        loginViewModel.onEvent(
                                            LoginUIEvent.PasswordValueChangeEvent(
                                                it
                                            )
                                        )
                                        loginViewModel.printState()
                                        loginViewModel.loginUIState.value.passwordErrorState
                                    },
                                    recheckFiled = recheckFiled
                                )
                                Spacer(modifier = Modifier.size(8.dp))
                                ForgotPassword(onResetProcessResult = { message ->
                                    Toast.makeText(context, message, Toast.LENGTH_SHORT).show()
                                })
                            }
                        }
                        Box(contentAlignment = Alignment.Center) {
                            Column(
                                horizontalAlignment = Alignment.CenterHorizontally,
                                verticalArrangement = Arrangement.SpaceBetween
                            ) {
                                ButtonComponent(
                                    "Login",
                                    onButtonClick = {
                                        recheckFiled = true
                                        if (loginViewModel.validateWithRulesForLogIn()) {
                                            navController.navigate(Destination.AllRequest::class.java)
                                        } else {
                                            Toast.makeText(
                                                context,
                                                "Fill all the required fields!",
                                                Toast.LENGTH_LONG
                                            ).show()
                                        }
                                    },
                                    loginViewModel.validateWithRulesForLogIn()
                                )
                                Spacer(modifier = Modifier.size(16.dp))
                                SimpleTextWithSpan(
                                    "Don't have an account? ",
                                    "Register",
                                    onTextClicked = {
                                        navController.navigate(Destination.Registration::class.java)
                                    })
                            }
                        }

                    }
                }
                if (loginViewModel.requestInProgress.value)
                    CircularProgressIndicator(color = teal, trackColor = Gray1)
            }
        }
    }
}

@Preview
@Composable
fun LoginScreenPreview() {
    LoginScreen(
        navController = NavHostController(LocalContext.current),
        loginViewModel = LoginViewModel()
    )
}