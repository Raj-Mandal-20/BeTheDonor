package com.example.bethedonor.ui.screens

import PhoneNumberEditText
import android.util.Log
import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Password
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.example.bethedonor.data.uievent.RegistrationUIEvent
import com.example.bethedonor.navigation.Destination
import com.example.bethedonor.ui.components.AvailabilityCheckerField
import com.example.bethedonor.ui.components.ButtonComponent
import com.example.bethedonor.ui.components.DOBSelectField
import com.example.bethedonor.ui.components.EditText
import com.example.bethedonor.ui.components.GreetingText
import com.example.bethedonor.ui.components.NumericOnlyField
import com.example.bethedonor.ui.components.PasswordFiled
import com.example.bethedonor.ui.components.SelectStateDistrictCityField
import com.example.bethedonor.ui.components.SelectionField
import com.example.bethedonor.ui.components.SimpleTextWithSpan
import com.example.bethedonor.ui.components.SubGreetText
import com.example.bethedonor.ui.theme.fadeBlue1
import com.example.bethedonor.ui.theme.fadeBlue2
import com.example.bethedonor.utils.readJsonFromAssets
import com.example.bethedonor.viewmodels.RegistrationViewModel

@Composable
fun RegistrationScreen(
    navController: NavHostController = rememberNavController(),
    registrationViewModel: RegistrationViewModel = viewModel()
) {
    val context = LocalContext.current
    val bloodGroupsList = listOf("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    val genderList = listOf("Male", "Female", "Other")
    val areaData = readJsonFromAssets(context, "Location.json")

    registrationViewModel.setAreaData(areaData)

    Log.d("JSON", areaData?.states.toString())
    var recheckFiled by remember {
        mutableStateOf(false)
    }
    Box(
        modifier = Modifier
            .fillMaxSize(), contentAlignment = Alignment.Center
    ) {
        Surface(
            modifier = Modifier
                .fillMaxSize(),
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
                    verticalArrangement = Arrangement.SpaceBetween,
                    modifier = Modifier
                        .padding(vertical = 20.dp, horizontal = 20.dp)
                        .fillMaxWidth()
                        .verticalScroll(rememberScrollState())
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center
                        ) {
                            GreetingText()
                            Spacer(modifier = Modifier.size(8.dp))
                            SubGreetText(text = "Register as a Donor")
                            Spacer(modifier = Modifier.size(20.dp))
                            EditText(
                                label = "Name",
                                labelIcon = Icons.Filled.Person,
                                onFiledValueChanged = {
                                    registrationViewModel.onEvent(
                                        RegistrationUIEvent.NameValueChangeEvent(
                                            it
                                        )
                                    )
                                    registrationViewModel.printState()
                                    registrationViewModel.registrationUIState.value.nameErrorState

                                },
                                recheckFiled = recheckFiled
                            )
                            EditText(
                                label = "Email-id",
                                labelIcon = Icons.Filled.Email,
                                onFiledValueChanged = {
                                    registrationViewModel.onEvent(
                                        RegistrationUIEvent.EmailValueChangeEvent(
                                            it
                                        )
                                    )
                                    registrationViewModel.printState()
                                    registrationViewModel.registrationUIState.value.emailIdErrorState
                                },
                                recheckFiled = recheckFiled
                            )
                            //
//                            Row(
//                                verticalAlignment = Alignment.CenterVertically,
//                                horizontalArrangement = Arrangement.Center,
//                                modifier = Modifier.fillMaxWidth()
//                            ) {
                            var code by remember { mutableStateOf("") }
                            PhoneNumberEditText(
                                onFieldValueChanged = {
                                    registrationViewModel.onEvent(
                                        RegistrationUIEvent.PhoneNoChangeEvent(code + it)
                                    )
                                    registrationViewModel.printState()
                                    registrationViewModel.registrationUIState.value.phoneNoErrorState
                                },
                                recheckField = recheckFiled,
                                code = {
                                    code = it
                                },
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .padding(end = 4.dp)
                            )
//                                NumericOnlyField(
//                                    onFiledValueChanged = {
//                                        registrationViewModel.onEvent(
//                                            RegistrationUIEvent.AgeValueChangeEvent(it)
//                                        )
//                                        registrationViewModel.printState()
//                                        registrationViewModel.registrationUIState.value.ageErrorState
//                                    },
//                                    recheckFiled = recheckFiled,
//                                    label = "Age",
//                                    modifier = Modifier
//                                        .weight(1f)
//                                        .padding(start = 4.dp)
//                                )
                            // }
                            if (registrationViewModel.availableToDonate.value) {
                                DOBSelectField(
                                    onFieldValueChanged = {
                                        registrationViewModel.onEvent(
                                            RegistrationUIEvent.AgeValueChangeEvent(it)
                                        )
                                        registrationViewModel.printState()
                                        registrationViewModel.registrationUIState.value.ageErrorState
                                    },
                                    recheckField = recheckFiled,
                                    label = "DOB",
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding(start = 4.dp)
                                )
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    modifier = Modifier.fillMaxWidth()
                                ) {

                                    //Gender
                                    SelectionField(
                                        options = genderList,
                                        label = "Gender",
                                        onSelection = {
                                            registrationViewModel.onEvent(
                                                RegistrationUIEvent.GenderValueChangeEvent(it)
                                            )
                                            registrationViewModel.printState()
                                            registrationViewModel.registrationUIState.value.genderErrorState
                                        },
                                        recheckFiled = recheckFiled,
                                        modifier = Modifier
                                            .weight(1f)
                                            .padding(end = 4.dp)

                                    )
                                    //Blood Group
                                    SelectionField(
                                        options = bloodGroupsList,
                                        label = "Blood Group",
                                        onSelection = {
                                            registrationViewModel.onEvent(
                                                RegistrationUIEvent.BloodGroupValueChangeEvent(it)
                                            )
                                            registrationViewModel.printState()
                                            registrationViewModel.registrationUIState.value.bloodGroupErrorState
                                        },
                                        recheckFiled = recheckFiled,
                                        modifier = Modifier
                                            .weight(1f)
                                            .padding(start = 4.dp)

                                    )
                                }
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.Start,
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    SelectStateDistrictCityField(
                                        label = "State",
                                        options = registrationViewModel.getStateDataList(),
                                        selectedValue = registrationViewModel.selectedState.value,
                                        onSelection = {
                                            registrationViewModel.onEvent(
                                                RegistrationUIEvent.StateValueChangeEvent(
                                                    it
                                                )
                                            )
                                            registrationViewModel.selectState(it)
                                            registrationViewModel.printState()
                                            registrationViewModel.registrationUIState.value.stateErrorState
                                        },
                                        modifier = Modifier
                                            .weight(1f)
                                            .padding(end = 4.dp),
                                        recheckFiled = recheckFiled
                                    )
                                    SelectStateDistrictCityField(
                                        label = "District",
                                        options = registrationViewModel.getDistrictList(),
                                        selectedValue = registrationViewModel.selectedDistrict.value,
                                        onSelection = {
                                            registrationViewModel.onEvent(
                                                RegistrationUIEvent.DistrictValueChangeEvent(
                                                    it
                                                )
                                            )
                                            registrationViewModel.selectDistrict(it)
                                            registrationViewModel.printState()
                                            registrationViewModel.registrationUIState.value.districtErrorState
                                        },
                                        modifier = Modifier
                                            .weight(1f)
                                            .padding(start = 4.dp),
                                        recheckFiled = recheckFiled,
                                    )
                                }
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.Start,
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    SelectStateDistrictCityField(
                                        label = "City",
                                        options = registrationViewModel.getCityList(),
                                        selectedValue = registrationViewModel.selectedCity.value,
                                        onSelection = {
                                            registrationViewModel.onEvent(
                                                RegistrationUIEvent.CityValueChangeEvent(
                                                    it
                                                )
                                            )
                                            registrationViewModel.selectCity(it)
                                            registrationViewModel.printState()
                                            registrationViewModel.registrationUIState.value.cityErrorState
                                        },
                                        modifier = Modifier
                                            .weight(1f)
                                            .padding(end = 4.dp),
                                        recheckFiled = recheckFiled,
                                    )

//                                NumericOnlyField(
//                                    onFiledValueChanged = {
//                                        registrationViewModel.onEvent(
//                                            RegistrationUIEvent.PinCodeValueChangeEvent(it)
//                                        )
//                                        registrationViewModel.printState()
//                                        registrationViewModel.registrationUIState.value.pinCodeErrorState
//                                    },
//                                    recheckFiled = recheckFiled,
//                                    label = "Zip Code",
//                                    modifier = Modifier.fillMaxWidth()
//                                )
                                    SelectStateDistrictCityField(
                                        label = "Zip",
                                        options = registrationViewModel.getPinCodeList(),
                                        selectedValue = registrationViewModel.selectedPinCode.value,
                                        onSelection = {
                                            registrationViewModel.onEvent(
                                                RegistrationUIEvent.PinCodeValueChangeEvent(
                                                    it
                                                )
                                            )
                                            registrationViewModel.selectPin(it)
                                            registrationViewModel.printState()
                                            registrationViewModel.registrationUIState.value.pinCodeErrorState
                                        },
                                        modifier = Modifier
                                            .weight(1f)
                                            .padding(start = 4.dp),
                                        recheckFiled = recheckFiled,
                                    )
                                }
                            }
                            PasswordFiled(
                                label = "Password",
                                labelIcon = Icons.Filled.Password,
                                onFiledValueChanged = {
                                    registrationViewModel.onEvent(
                                        RegistrationUIEvent.PasswordValueChangeEvent(
                                            it
                                        )
                                    )
                                    registrationViewModel.printState()
                                    registrationViewModel.registrationUIState.value.passwordErrorState
                                },
                                recheckFiled = recheckFiled
                            )

                            PasswordFiled(
                                "Confirm Password",
                                Icons.Filled.Password,
                                isConfirmPasswordField = true,
                                onFiledValueChanged = {
                                    registrationViewModel.onEvent(
                                        RegistrationUIEvent.ConfirmPasswordValueChangeEvent(
                                            it
                                        )
                                    )
                                    registrationViewModel.printState()
                                    registrationViewModel.registrationUIState.value.confirmPasswordState
                                }, recheckFiled = recheckFiled
                            )
                            AvailabilityCheckerField(
                                value = registrationViewModel.availableToDonate.value,
                                onCheckerChange = {
                                    registrationViewModel.onEvent(
                                        RegistrationUIEvent.AvailabilityCheckerValueChangeEvent(it)

                                    )
                                    registrationViewModel.setAvailableToDonate(it)
                                    registrationViewModel.printState()
                                    registrationViewModel.registrationUIState.value.checkedAvailabilityStatus
                                })
                        }
                    }
                    Box(contentAlignment = Alignment.Center) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.SpaceBetween
                        ) {
                            ButtonComponent(
                                "Register",
                                onButtonClick = {
                                    //signupViewModel.registration()
                                    recheckFiled = true
                                    if (registrationViewModel.validateWithRulesForRegister()) {
                                        navController.navigate(Destination.Login::class.java)
                                    } else {
                                        Toast.makeText(
                                            context,
                                            "Fill all the required fields!",
                                            Toast.LENGTH_LONG
                                        ).show()
                                    }
                                },
                                isEnable = registrationViewModel.validateWithRulesForRegister()
                            )
                            Spacer(modifier = Modifier.size(16.dp))
                            SimpleTextWithSpan(
                                "Already have an account? ",
                                "Login",
                                onTextClicked = {
                                    navController.navigate(Destination.Login::class.java)
                                })
                        }
                    }

                }
            }
        }
    }
}

@Preview
@Composable
fun RegistrationScreenPreview() {
    RegistrationScreen(
        navController = NavHostController(LocalContext.current),
        registrationViewModel = RegistrationViewModel()
    )
}