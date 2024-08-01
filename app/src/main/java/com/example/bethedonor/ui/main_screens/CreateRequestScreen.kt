package com.example.bethedonor.ui.main_screens

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AdUnits
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.LocationCity
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.focus.focusModifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.bethedonor.ui.components.ButtonComponent
import com.example.bethedonor.ui.components.EditText
import com.example.bethedonor.ui.components.NumericOnlyField
import com.example.bethedonor.ui.components.SelectStateDistrictCityField
import com.example.bethedonor.ui.components.SelectionField
import com.example.bethedonor.ui.theme.fadeBlue1
import com.example.bethedonor.ui.theme.fadeBlue2
import com.example.bethedonor.ui.utils.uievent.RegistrationUIEvent
import com.example.bethedonor.ui.utils.validationRules.ValidationResult
import com.example.bethedonor.utils.bloodGroupList1
import com.example.bethedonor.utils.bloodGroupList2
import com.example.bethedonor.utils.readJsonFromAssets
import com.example.bethedonor.viewmodels.CreateRequestViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CreateRequestScreen(
    navController: NavController,
    innerPaddingValues: PaddingValues,
    uId: String,
    onDone: () -> Unit,
    createRequestViewModel: CreateRequestViewModel = viewModel()
) {
    val context = LocalContext.current
    val bloodGroupsList = bloodGroupList2
    val areaData = readJsonFromAssets(context, "Location.json")

    createRequestViewModel.setAreaData(areaData)

    Surface(
        modifier = Modifier
            .fillMaxSize(),

        ) {
        Scaffold(topBar = {
            Icon(
                imageVector = Icons.Filled.Clear,
                contentDescription = "clear",
                modifier = Modifier
                    .size(24.dp)
                    .clickable { onDone() },
                tint = Color.White
            )
        }) { it ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(top = it.calculateBottomPadding())
                    .verticalScroll(rememberScrollState())
                    .background(
                        brush = Brush.linearGradient(
                            colors = listOf(fadeBlue1, fadeBlue2),
                            start = Offset.Zero,
                            end = Offset.Infinite
                        )
                    ),

                ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center,
                    modifier = Modifier.padding(top = 40.dp, start = 16.dp, end = 16.dp)
                ) {
                    Text(
                        text = "Request for Donation",
                        style = TextStyle(
                            fontSize = MaterialTheme.typography.headlineMedium.fontSize,
                            fontWeight = FontWeight.SemiBold
                        ), color = Color.White
                    )
                    SpacerComponent(dp = 8.dp)
                    Text(
                        text = "Fill out the form to request for new donations.",
                        style = TextStyle(fontSize = MaterialTheme.typography.titleMedium.fontSize),
                        color = Color.Gray
                    )
                    SpacerComponent(dp = 16.dp)
                    EditText(
                        onFiledValueChanged = {
                            ValidationResult()
                        }, label = "Donation Center",
                        labelIcon = Icons.Filled.LocationCity
                    )
                    SelectStateDistrictCityField(
                        label = "State",
                        options = createRequestViewModel.getStateDataList(),
                        selectedValue = createRequestViewModel.selectedState.value,
                        onSelection = {
//                            registrationViewModel.onEvent(
//                                RegistrationUIEvent.StateValueChangeEvent(
//                                    it
//                                )
//                            )
                            createRequestViewModel.selectState(it)
                            //   registrationViewModel.printState()
                            ValidationResult()
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                    )
                    SelectStateDistrictCityField(
                        label = "District",
                        options = createRequestViewModel.getDistrictList(),
                        selectedValue = createRequestViewModel.selectedDistrict.value,
                        onSelection = {
//                            registrationViewModel.onEvent(
//                                RegistrationUIEvent.DistrictValueChangeEvent(
//                                    it
//                                )
//                            )
                            createRequestViewModel.selectDistrict(it)
//                            registrationViewModel.printState()
//                            registrationViewModel.registrationUIState.value.districtErrorState
                            ValidationResult()
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                    )
                    SelectStateDistrictCityField(
                        label = "City",
                        options = createRequestViewModel.getCityList(),
                        selectedValue = createRequestViewModel.selectedCity.value,
                        onSelection = {
//                            registrationViewModel.onEvent(
//                                RegistrationUIEvent.CityValueChangeEvent(
//                                    it
//                                )
//                            )
                            createRequestViewModel.selectCity(it)
                            // registrationViewModel.printState()
                            //registrationViewModel.registrationUIState.value.cityErrorState
                            ValidationResult()
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                        // recheckFiled = recheckFiled,
                    )
//
                    SelectStateDistrictCityField(
                        label = "Zip",
                        options = createRequestViewModel.getPinCodeList(),
                        selectedValue = createRequestViewModel.selectedPinCode.value,
                        onSelection = {
//                            registrationViewModel.onEvent(
//                                RegistrationUIEvent.PinCodeValueChangeEvent(
//                                    it
//                                )
//                            )
                            createRequestViewModel.selectPin(it)
//                            registrationViewModel.printState()
//                            registrationViewModel.registrationUIState.value.pinCodeErrorState
                            ValidationResult()
                        },
                        modifier = Modifier
                            .fillMaxWidth()
                        //   recheckFiled = recheckFiled,
                    )
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        NumericOnlyField(
                            onFiledValueChanged = {
                                ValidationResult()
                            },
                            modifier = Modifier
                                .weight(1f)
                                .padding(end = 4.dp),
                            label = "Blood Unit"
                        )
                        SelectionField(
                            options = bloodGroupsList,
                            label = "Blood Group",
                            onSelection = {
//                                registrationViewModel.onEvent(
//                                    RegistrationUIEvent.BloodGroupValueChangeEvent(it)
//                                )
//                                registrationViewModel.printState()
                                // registrationViewModel.registrationUIState.value.bloodGroupErrorState
                                ValidationResult()
                            },
                            //   recheckFiled = recheckFiled,
                            modifier = Modifier
                                .weight(1f)
                                .padding(start = 4.dp)
                        )

                    }
                    SpacerComponent(dp = 20.dp)
                    ButtonComponent(onButtonClick = { onDone() }, text = "Request")
                }
            }

        }
    }
}
