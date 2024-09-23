package com.example.bethedonor.ui.main_screens

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
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.heightIn
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
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.bethedonor.R
import com.example.bethedonor.ui.utils.uievent.RegistrationUIEvent
import com.example.bethedonor.ui.components.AvailabilityCheckerField
import com.example.bethedonor.ui.components.ButtonComponent
import com.example.bethedonor.ui.components.CalendarSelectField
import com.example.bethedonor.ui.components.EditText
import com.example.bethedonor.ui.components.GreetingText
import com.example.bethedonor.ui.components.PasswordFiled
import com.example.bethedonor.ui.components.ProgressIndicatorComponent
import com.example.bethedonor.ui.components.SelectStateDistrictCityField
import com.example.bethedonor.ui.components.SelectionField
import com.example.bethedonor.ui.components.SimpleTextWithSpan
import com.example.bethedonor.ui.components.SubGreetText
import com.example.bethedonor.ui.utils.commons.linearGradientBrush
import com.example.bethedonor.ui.utils.commons.showToast
import com.example.bethedonor.utils.bloodGroupList1
import com.example.bethedonor.utils.genderList
import com.example.bethedonor.utils.getCityList
import com.example.bethedonor.utils.getDistrictList
import com.example.bethedonor.utils.getPinCodeList
import com.example.bethedonor.utils.getStateDataList
import com.example.bethedonor.viewmodels.RegistrationViewModel

@Composable
fun RegistrationScreen(
    onRegisterNavigate: () -> Unit,
    registrationViewModel: RegistrationViewModel = viewModel(),
) {
    val context = LocalContext.current
    val bloodGroupsList = bloodGroupList1
    val genderList = genderList
//    val areaData = readJsonFromAssets(context, "Location.json")
//    registrationViewModel.setAreaData(areaData)

    val registrationResponse by registrationViewModel.registrationResponse.observeAsState()

    // Log.d("JSON", areaData?.states.toString())
    val recheckFiled by remember {
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
                        linearGradientBrush()
                    ), contentAlignment = Alignment.Center
            )
            {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.SpaceBetween,
                    modifier = Modifier
                        .padding(horizontal = 20.dp)
                        .fillMaxWidth()
                        .verticalScroll(rememberScrollState())
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center
                        ) {
                            Spacer(modifier = Modifier.height(16.dp))
                            GreetingText()
                            Spacer(modifier = Modifier.height(8.dp))
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
                                CalendarSelectField(
                                    onFieldValueChanged = {
                                        registrationViewModel.onEvent(
                                            RegistrationUIEvent.DateValueChangeEvent(it)
                                        )
                                        registrationViewModel.printState()
                                        registrationViewModel.registrationUIState.value.ageErrorState
                                    },
                                    recheckField = recheckFiled,
                                    label = "DOB",
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .padding()
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
                                        //  recheckFiled = recheckFiled,
                                        modifier = Modifier
                                            .fillMaxWidth(0.5f)
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
                                        //   recheckFiled = recheckFiled,
                                        modifier = Modifier
                                            .fillMaxWidth(0.5f)
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
                                        options = getStateDataList(),
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
                                        //  recheckFiled = recheckFiled
                                    )
                                    SelectStateDistrictCityField(
                                        label = "District",
                                        options = getDistrictList(selectedState = registrationViewModel.selectedState.value),
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
                                        // recheckFiled = recheckFiled,
                                    )
                                }
                                Row(
                                    verticalAlignment = Alignment.CenterVertically,
                                    horizontalArrangement = Arrangement.Start,
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    SelectStateDistrictCityField(
                                        label = "Zip",
                                        options = getPinCodeList(
                                            selectedState = registrationViewModel.selectedState.value,
                                            selectedDistrict = registrationViewModel.selectedDistrict.value,
                                        ),
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
                                            .padding(end = 4.dp),
                                        //   recheckFiled = recheckFiled,
                                    )
                                    SelectStateDistrictCityField(
                                        label = "City",
                                        options = getCityList(
                                            selectedState = registrationViewModel.selectedState.value,
                                            selectedDistrict = registrationViewModel.selectedDistrict.value,
                                            selectedPinCode = registrationViewModel.selectedPinCode.value
                                        ),
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
                                            .padding(start = 4.dp),
                                        // recheckFiled = recheckFiled,
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
                                    //   recheckFiled = true
                                    Log.d("validity",registrationViewModel.validateWithRulesForRegister().toString())
                                    if (registrationViewModel.validateWithRulesForRegister()) {
                                        registrationViewModel.registerUser(onRegister = {
                                            registrationResponse?.let {
                                                if (it.isSuccess) {
                                                    if (it.getOrNull()?.statusCode == null && it.getOrNull()?.message != "timeout") {
                                                        onRegisterNavigate()
                                                    }
                                                    showToast(
                                                        context,
                                                        it.getOrNull()?.message.toString(),
                                                    )
                                                } else {
                                                    showToast(
                                                        context,
                                                        it.exceptionOrNull()?.message.toString()
                                                    )
                                                }
                                            }
                                        })
                                    } else {
                                        showToast(context, "Fill all the required fields!")
                                    }
                                },
                                isEnable = registrationViewModel.validateWithRulesForRegister() && !registrationViewModel.requestInProgress.value
                            )
                            Spacer(modifier = Modifier.height(20.dp))
                            SimpleTextWithSpan(
                                "Already have an account? ",
                                "Login",
                                onTextClicked = {
                                    onRegisterNavigate()
                                }, modifier =Modifier.padding(bottom = 16.dp))
                            Spacer(modifier = Modifier.size(16.dp))
                        }
                    }

                }
                if (registrationViewModel.requestInProgress.value) {
                    ProgressIndicatorComponent(label = stringResource(id = R.string.registering_indicator))
                }
            }
        }
    }
}

@Preview
@Composable
fun RegistrationScreenPreview() {
    RegistrationScreen(
        onRegisterNavigate = {},
        registrationViewModel = RegistrationViewModel()
    )
}