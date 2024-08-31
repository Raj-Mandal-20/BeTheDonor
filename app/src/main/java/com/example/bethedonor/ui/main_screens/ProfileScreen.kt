package com.example.bethedonor.ui.main_screens

import PhoneNumberEditText
import android.util.Log
import android.widget.Toast
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.Logout
import androidx.compose.material.icons.filled.DeleteForever
import androidx.compose.material.icons.filled.DoNotDisturbAlt
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Warning
import androidx.compose.material.icons.outlined.Bloodtype
import androidx.compose.material.icons.outlined.DateRange
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.Phone
import androidx.compose.material.icons.outlined.Transgender
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonColors
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.pulltorefresh.PullToRefreshContainer
import androidx.compose.material3.pulltorefresh.rememberPullToRefreshState
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.geometry.Size
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.bethedonor.data.dataModels.ProfileResponse
import com.example.bethedonor.ui.components.AvailabilityCheckerField
import com.example.bethedonor.ui.components.ButtonComponent
import com.example.bethedonor.ui.components.EditText
import com.example.bethedonor.ui.components.ProgressIndicatorComponent
import com.example.bethedonor.ui.components.Retry
import com.example.bethedonor.ui.components.SelectStateDistrictCityField
import com.example.bethedonor.ui.components.SelectionField
import com.example.bethedonor.ui.components.WarningDialog
import com.example.bethedonor.ui.theme.activeColor1
import com.example.bethedonor.ui.theme.bgDarkBlue
import com.example.bethedonor.ui.theme.bloodRed2
import com.example.bethedonor.ui.theme.bloodTransparent2
import com.example.bethedonor.ui.theme.darkGray
import com.example.bethedonor.ui.theme.fadeBlue11
import com.example.bethedonor.ui.utils.commons.showToast
import com.example.bethedonor.ui.utils.uievent.RegistrationUIEvent
import com.example.bethedonor.ui.utils.validationRules.ValidationResult
import com.example.bethedonor.utils.formatDate
import com.example.bethedonor.utils.genderList
import com.example.bethedonor.utils.getCityList
import com.example.bethedonor.utils.getCountryCode
import com.example.bethedonor.utils.getDistrictList
import com.example.bethedonor.utils.getInitials
import com.example.bethedonor.utils.getPhoneNoWithoutCountryCode
import com.example.bethedonor.utils.getPinCodeList
import com.example.bethedonor.utils.getStateDataList
import com.example.bethedonor.viewmodels.ProfileViewModel
import kotlinx.coroutines.launch
import java.util.Date

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(
    authToken: String,
    innerPadding: PaddingValues,
    profileViewmodel: ProfileViewModel,
    onLogOutNavigate: () -> Unit
) {
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()
    var profileData by remember { mutableStateOf<ProfileResponse?>(null) }
    var errorMessage by remember { mutableStateOf<String?>(null) }
    val profileResponse by profileViewmodel.profileResponse.observeAsState()
    // val deleteAccountResponse by profileViewmodel.deleteAccountResponse.collectAsState()

    val sheetState = rememberModalBottomSheetState(
        skipPartiallyExpanded = true
    )
    var showBottomSheet by remember { mutableStateOf(false) }

    val isRefreshing by profileViewmodel.isRefreshing.collectAsState()
    val pullToRefreshState = rememberPullToRefreshState()
    //**********

    profileResponse?.let {
        if (it.isSuccess) {
            profileData = it.getOrNull()
        } else {
            errorMessage = it.exceptionOrNull()?.message
        }
    }
    val hasFetchedProfile = profileViewmodel.getFetchedProfile()
    LaunchedEffect(Unit) {
        if (!hasFetchedProfile) {
            networkCall(profileViewmodel, authToken, onResolve = {})
            profileViewmodel.setFetchedProfile(true)
        }
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
                        color = bgDarkBlue
                    )
                    .nestedScroll(pullToRefreshState.nestedScrollConnection)
            ) {
                profileData?.myProfile?.let {
                    Column(
                        verticalArrangement = Arrangement.Center,
                        modifier = Modifier
                            .verticalScroll(
                                rememberScrollState()
                            )
                            .padding(
                                start = 16.dp,
                                end = 16.dp,
                                top = 30.dp,
                                bottom = innerPadding.calculateBottomPadding() * 2
                            )
                    ) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceEvenly
                        ) {
                            Box(
                                modifier = Modifier
                                    .size(80.dp)
                                    .background(bloodRed2, shape = RoundedCornerShape(60.dp)),
                                contentAlignment = Alignment.Center
                            ) {
                                if (it.available == true) {
                                    Canvas(modifier = Modifier.fillMaxSize()) {
                                        val imageWidth = 80.dp.toPx()
                                        val radius = imageWidth / 2f
                                        val overlapAmount = radius / 3f
                                        val iconSize =
                                            overlapAmount * 1.5f // Reduce the size of the indicator

                                        val iconCenterX =
                                            (size.width / 2f) + (imageWidth / 2f) - overlapAmount
                                        val iconCenterY =
                                            (size.height / 2f) + (imageWidth / 2f) - overlapAmount

                                        val arcStartAngle =
                                            140f // Start angle for the arc in degrees
                                        val arcSweepAngle =
                                            2500f // Sweep angle for the arc in degrees

                                        val arcRect = androidx.compose.ui.geometry.Rect(
                                            left = (iconCenterX - iconSize / 2f),
                                            top = (iconCenterY - iconSize / 2f),
                                            right = (iconCenterX + iconSize / 2f),
                                            bottom = (iconCenterY + iconSize / 2f)
                                        )

                                        drawCircle(
                                            color = bloodRed2,
                                            radius = radius,
                                            center = Offset(size.width / 2f, size.height / 2f)
                                        )

                                        drawArc(
                                            color = bgDarkBlue,
                                            startAngle = arcStartAngle,
                                            sweepAngle = arcSweepAngle,
                                            useCenter = false,
                                            topLeft = arcRect.topLeft,
                                            size = Size(arcRect.width, arcRect.height),
                                            style = Stroke(width = 12f)
                                        )

                                        drawCircle(
                                            color = activeColor1,
                                            radius = iconSize / 2f,
                                            center = Offset(iconCenterX, iconCenterY)
                                        )
                                    }
                                }
                                // Green Dot
                                Text(
                                    text = "${it.name?.let { it1 -> getInitials(it1) }}",
                                    fontSize = MaterialTheme.typography.headlineLarge.fontSize,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White
                                )
                            }  // Green Dot positioned on top of the text

                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.SpaceEvenly,
                                modifier = Modifier.weight(1f)

                            ) {
                                TextComponent(
                                    value = it.requests?.size ?: 0,
                                    label = "Requested"
                                )
                                TextComponent(
                                    value = it.donates?.size ?: 0,
                                    label = "Donated"
                                )
                            }

                        }
                        SpacerComponent(12.dp)
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            BoldTextComponent(label = it.name ?: "John Dao")
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(1.dp)
                            ) {
                                if (it.available == false)
                                    Icon(
                                        //imageVector = Icons.Filled.ModeNight,
                                        imageVector = Icons.Filled.DoNotDisturbAlt,
                                        contentDescription = "Not Available",
                                        tint = bloodTransparent2
                                        // tint = moonNightColor,
                                        // modifier = Modifier.rotate(45F)
                                    )
                                Text(
                                    text = if (it.available == true) "Available" else "Not Available",
                                    color = if (it.available == true) Color.White else Color.LightGray,
                                    fontSize = MaterialTheme.typography.bodyLarge.fontSize
                                )
                            }
                        }
                        SpacerComponent(4.dp)
                        Text(
                            text = it.email ?: "xyz@gmail.com",
                            color = Color.LightGray
                        )
                        SpacerComponent(16.dp)
                        ButtonElement(label = "Sing out",
                            onClick = {},
                            showDialog = true,
                            dialogTitle = "Confirm Logout",
                            dialogMessage = "Are you sure you want to logout? You will need to log in again to access your account.",
                            dialogIcon = Icons.AutoMirrored.Filled.Logout,
                            onConfirmAction = {
                                coroutineScope.launch {
                                    profileViewmodel.logoutUser(onLogout = {
                                        onLogOutNavigate()
                                    })
                                    Toast.makeText(context, "Logged out", Toast.LENGTH_SHORT).show()
                                }
                            }
                        )
                        SpacerComponent(dp = 24.dp)
                        BoldTextComponent(label = "Personal Information")
                        SpacerComponent(dp = 20.dp)
                        InformationComponent(
                            icon = Icons.Outlined.Home,
                            label = "Address",
                            value = "${it.state}, ${it.district}, ${it.city}, ${
                                it.pin
                            }"
                        )
                        InformationComponent(
                            icon = Icons.Outlined.Phone,
                            label = "Phone",
                            value = it.phoneNumber ?: "175483758"
                        )
                        InformationComponent(
                            icon = Icons.Outlined.Transgender,
                            label = "Gender",
                            value = it.gender ?: "Male"
                        )
                        InformationComponent(
                            icon = Icons.Outlined.Bloodtype,
                            label = "Blood Group",
                            value = it.bloodGroup ?: "B+"
                        )
                        InformationComponent(
                            icon = Icons.Outlined.DateRange,
                            label = "DOB",
                            value = formatDate(it.dob ?: Date(0))
                        )
                        ButtonElement(label = "Edit profile", onClick = {
                            showBottomSheet = true
                        })
                        SpacerComponent(16.dp)
                        ButtonComponent(
                            isEnable = !profileViewmodel.requestInProgress.value,
                            buttonText = "Delete Account",
                            onButtonClick = {},
                            showDialog = true,
                            dialogTitle = "Confirm Deletion",
                            dialogMessage = "Are you sure you want to delete your account? This action is irreversible, and all your data will be permanently lost.",
                            dialogIcon = Icons.Filled.DeleteForever,
                            onConfirmAction = {
                                profileViewmodel.deleteAccount(token = authToken) { result ->
                                    if (result.isSuccess) {
                                        // Handle the success case
                                        val response = result.getOrNull()
                                        Toast.makeText(
                                            context,
                                            response?.message ?: "Account Deleted",
                                            Toast.LENGTH_SHORT
                                        ).show()

                                        // Proceed to logout after account deletion is successful
                                        coroutineScope.launch {
                                            profileViewmodel.logoutUser(onLogout = {
                                                onLogOutNavigate()
                                            })
                                        }
                                    } else {
                                        val error = result.exceptionOrNull()
                                        Toast.makeText(
                                            context,
                                            error?.message ?: "Failed to delete account",
                                            Toast.LENGTH_SHORT
                                        ).show()
                                    }
                                }
                            }
                        )

                    }

                }
                LaunchedEffect(isRefreshing) {
                    if (isRefreshing) {
                        pullToRefreshState.startRefresh()
                    } else {
                        pullToRefreshState.endRefresh()
                    }
                }
                if (pullToRefreshState.isRefreshing) {
                    LaunchedEffect(true) {
                        profileViewmodel.setRefresherStatusTrue()
                        networkCall(profileViewmodel, authToken, onResolve = {})
                    }
                }
                PullToRefreshContainer(
                    state = pullToRefreshState, modifier = Modifier.align(
                        Alignment.TopCenter
                    )
                )
            }
        }
        val recheckFiled by remember {
            mutableStateOf(false)
        }
        if (showBottomSheet) {
            profileViewmodel.selectedState.value = profileData?.myProfile?.state
            profileViewmodel.selectedDistrict.value = profileData?.myProfile?.district
            profileViewmodel.selectedCity.value = profileData?.myProfile?.city
            profileViewmodel.selectedPinCode.value = profileData?.myProfile?.pin
            profileViewmodel.setAvailableToDonate(profileData?.myProfile?.available ?: false)

            ModalBottomSheet(
                onDismissRequest = {
                    showBottomSheet = false
                },
                sheetState = sheetState,
                modifier = Modifier
                    .fillMaxSize(),
                containerColor = fadeBlue11,

                ) {
                val isFieldChanged = remember {
                    mutableStateOf(false)
                }
                LaunchedEffect(showBottomSheet) {
                    Log.d("modalSheetLaunchEffect", "InEffect")
                    profileViewmodel.onEvent(
                        RegistrationUIEvent.GenderValueChangeEvent(
                            profileData?.myProfile?.gender.toString()
                        )
                    )
                    profileViewmodel.onEvent(
                        RegistrationUIEvent.StateValueChangeEvent(
                            profileData?.myProfile?.state.toString()
                        )
                    )
                    profileViewmodel.onEvent(
                        RegistrationUIEvent.DistrictValueChangeEvent(
                            profileData?.myProfile?.district.toString()
                        )
                    )
                    profileViewmodel.onEvent(
                        RegistrationUIEvent.CityValueChangeEvent(
                            profileData?.myProfile?.city.toString()
                        )
                    )
                    profileViewmodel.onEvent(
                        RegistrationUIEvent.PinCodeValueChangeEvent(
                            profileData?.myProfile?.pin.toString()
                        )
                    )
                    profileViewmodel.onEvent(
                        RegistrationUIEvent.AvailabilityCheckerValueChangeEvent(
                            profileData?.myProfile?.available ?: false
                        )
                    )
                    isFieldChanged.value = false
                }
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.SpaceBetween,
                    modifier = Modifier
                        .padding(
                            top = 16.dp,
                            bottom = innerPadding.calculateBottomPadding(),
                            start = 16.dp,
                            end = 16.dp
                        )
                        .fillMaxWidth()
                        .verticalScroll(rememberScrollState())
                ) {
                    Box(contentAlignment = Alignment.Center) {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center
                        ) {
                            EditText(
                                label = "Name",
                                value = profileData?.myProfile?.name.toString(),
                                labelIcon = Icons.Filled.Person,
                                onFiledValueChanged = {
                                    ValidationResult()
                                },
                                readOnly = true,
                                enable = false
                            )
                            EditText(
                                label = "Email-id",
                                value = profileData?.myProfile?.email.toString(),
                                labelIcon = Icons.Filled.Email,
                                onFiledValueChanged = {
                                    ValidationResult()
                                },
                                readOnly = true
                            )
                            var code =
                                getCountryCode(profileData?.myProfile?.phoneNumber.toString())
                            Log.d("countryCode", code)
                            PhoneNumberEditText(
                                readOnly = true,
                                onFieldValueChanged = {
                                    profileViewmodel.onEvent(
                                        RegistrationUIEvent.PhoneNoChangeEvent(code + it)
                                    )
                                    profileViewmodel.updateProfileUiState.value.phoneNoErrorState
                                },
                                value = getPhoneNoWithoutCountryCode(profileData?.myProfile?.phoneNumber.toString()),
                                recheckField = recheckFiled,
                                // countryCode = code,
                                code = {
                                    code = it
                                },
                                modifier = Modifier
                                    .fillMaxWidth()
                            )
                            SelectionField(
                                options = genderList,
                                index = genderList.indexOf(profileData?.myProfile?.gender),
                                label = "Gender",
                                onSelection = {
                                    isFieldChanged.value = true
                                    profileViewmodel.onEvent(
                                        RegistrationUIEvent.GenderValueChangeEvent(it)
                                    )
                                    profileViewmodel.updateProfileUiState.value.genderErrorState
                                },
                                modifier = Modifier.fillMaxWidth()
                            )
                            SelectStateDistrictCityField(
                                label = "State",
                                options = getStateDataList(),
                                selectedValue = profileViewmodel.selectedState.value,
                                onSelection = {
                                    isFieldChanged.value = true
                                    profileViewmodel.onEvent(
                                        RegistrationUIEvent.StateValueChangeEvent(
                                            it
                                        )
                                    )
                                    profileViewmodel.selectState(it)
                                    profileViewmodel.updateProfileUiState.value.stateErrorState
                                },
                                modifier = Modifier.fillMaxWidth()
                            )
                            SelectStateDistrictCityField(
                                label = "District",
                                options = getDistrictList(selectedState = profileViewmodel.selectedState.value),
                                selectedValue = profileViewmodel.selectedDistrict.value,
                                onSelection = {
                                    isFieldChanged.value = true
                                    profileViewmodel.onEvent(
                                        RegistrationUIEvent.DistrictValueChangeEvent(
                                            it
                                        )
                                    )
                                    profileViewmodel.selectDistrict(it)
                                    profileViewmodel.updateProfileUiState.value.districtErrorState
                                },
                                modifier = Modifier
                                    .fillMaxWidth()
                            )
                            SelectStateDistrictCityField(
                                label = "City",
                                options = getCityList(
                                    selectedState = profileViewmodel.selectedState.value,
                                    selectedDistrict = profileViewmodel.selectedDistrict.value
                                ),
                                selectedValue = profileViewmodel.selectedCity.value,
                                onSelection = {
                                    isFieldChanged.value = true
                                    profileViewmodel.onEvent(
                                        RegistrationUIEvent.CityValueChangeEvent(
                                            it
                                        )
                                    )
                                    profileViewmodel.selectCity(it)
                                    profileViewmodel.updateProfileUiState.value.cityErrorState
                                },
                                modifier = Modifier
                                    .fillMaxWidth()
                            )

                            SelectStateDistrictCityField(
                                label = "Zip",
                                options = getPinCodeList(
                                    selectedState = profileViewmodel.selectedState.value,
                                    selectedDistrict = profileViewmodel.selectedDistrict.value,
                                    selectedCity = profileViewmodel.selectedCity.value
                                ),
                                selectedValue = profileViewmodel.selectedPinCode.value,
                                onSelection = {
                                    isFieldChanged.value = true
                                    profileViewmodel.onEvent(
                                        RegistrationUIEvent.PinCodeValueChangeEvent(
                                            it
                                        )
                                    )
                                    profileViewmodel.selectPin(it)
                                    profileViewmodel.updateProfileUiState.value.pinCodeErrorState
                                },
                                modifier = Modifier
                                    .fillMaxWidth()
                            )
                            AvailabilityCheckerField(
                                value = profileViewmodel.availableToDonate.value,
                                onCheckerChange = {
                                    profileViewmodel.onEvent(
                                        RegistrationUIEvent.AvailabilityCheckerValueChangeEvent(it)
                                    )
                                    profileViewmodel.setAvailableToDonate(it)
                                    profileViewmodel.updateProfileUiState.value.checkedAvailabilityStatus
                                })

                            ButtonComponent(buttonText = "Apply", onButtonClick = {
                                if (isFieldChanged.value && !profileViewmodel.validateWithRulesForUpdate()) {
                                    showToast(
                                        context = context,
                                        "Please fill all the required fields"
                                    )
                                    return@ButtonComponent
                                }
                                coroutineScope.launch { sheetState.hide() }.invokeOnCompletion {
                                    if (!sheetState.isVisible) {
                                        showBottomSheet = false
                                    }
                                }
                                profileViewmodel.updateProfile(token = authToken, onUpdate = {
                                    if (it.first == "success") {
                                        coroutineScope.launch {
                                            networkCall(
                                                profileViewmodel,
                                                authToken,
                                                onResolve = {
                                                    profileResponse?.let { it ->
                                                        profileData = if (it.isSuccess) {
                                                            it.getOrNull()
                                                        } else {
                                                            ProfileResponse(message = it.exceptionOrNull()?.message.toString())
                                                        }
                                                    }
                                                }
                                            )
                                        }
                                    }
                                    showToast(context = context, it.second)
                                })
                            })
                        }
                    }
                }
            }
        }

        if (profileViewmodel.requestInProgress.value && !isRefreshing) {
            ProgressIndicatorComponent()
        }

        if (profileData?.myProfile == null && profileData?.message != null && !profileViewmodel.requestInProgress.value) {
            Retry(message = profileData?.message.toString(), onRetry = {
                coroutineScope.launch {
                    networkCall(
                        profileViewmodel,
                        authToken,
                        onResolve = {
                            profileResponse?.let {
                                profileData = if (it.isSuccess) {
                                    it.getOrNull()
                                } else {
                                    ProfileResponse(message = it.exceptionOrNull()?.message.toString())
                                }
                            }
                        }
                    )
                }
            })
        }
    }
}


private fun networkCall(
    profileViewmodel: ProfileViewModel,
    authToken: String,
    onResolve: () -> Unit?
) {
    profileViewmodel.getProfile(authToken) {
        onResolve()
    }
}


@Composable
fun ButtonElement(
    label: String, onClick: () -> Unit,
    isEnable: Boolean = true,
    showDialog: Boolean = false,
    dialogTitle: String = "",
    dialogMessage: String = "",
    onConfirmAction: () -> Unit = {},
    dialogIcon: ImageVector = Icons.Filled.Warning,
) {
    var isDialogVisible by remember { mutableStateOf(false) }

    if (isDialogVisible && showDialog) {
        WarningDialog(
            icon = dialogIcon,
            dialogTitle = dialogTitle,
            dialogText = dialogMessage,
            onDismissRequest = { isDialogVisible = false },
            onConfirmation = {
                isDialogVisible = false
                onConfirmAction()
            }
        )
    }
    Button(
        onClick = {
            if (showDialog) {
                isDialogVisible = true
            } else {
                onClick()
            }
        },
        colors = ButtonColors(
            containerColor = darkGray,
            contentColor = Color.White,
            disabledContentColor = Color.White,
            disabledContainerColor = darkGray
        ), shape = RoundedCornerShape(12.dp),
        modifier = Modifier.fillMaxWidth()
    ) {
        Text(text = label, fontSize = 16.sp, fontWeight = FontWeight.SemiBold)
    }
}

@Composable
fun InformationComponent(icon: ImageVector, label: String, value: String) {
    Row(
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(16.dp),
        modifier = Modifier.padding(bottom = 20.dp)
    ) {
        Box(
            modifier = Modifier
                .size(48.dp)
                .background(darkGray, shape = RoundedCornerShape(8.dp)),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = icon,
                contentDescription = label,
                tint = Color.White,
                modifier = Modifier.size(24.dp)
            )
        }
        Column(verticalArrangement = Arrangement.spacedBy(2.dp)) {
            Text(
                text = label,
                fontSize = MaterialTheme.typography.bodyMedium.fontSize,
                fontWeight = FontWeight.SemiBold,
                color = Color.White
            )
            Text(
                text = value,
                fontSize = MaterialTheme.typography.bodyMedium.fontSize,
                color = Color.LightGray
            )
        }
    }
}

@Composable
fun BoldTextComponent(label: String) {
    Text(
        text = label,
        fontSize = MaterialTheme.typography.titleLarge.fontSize,
        fontWeight = FontWeight.SemiBold,
        color = Color.White
    )
}

@Composable
fun SpacerComponent(dp: Dp) {
    Spacer(modifier = Modifier.height(dp))
}

@Composable
fun TextComponent(value: Int?, label: String) {
    Column(
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(
            text = value.toString(),
            fontSize = 14.sp,
            fontWeight = FontWeight.Bold,
            color = Color.White
        )
        Text(
            text = label,
            color = Color.White
        )
    }
}

@Preview
@Composable
fun ProfileScreenPreview() {
    ProfileScreen(
        authToken = "",
        innerPadding = PaddingValues(0.dp),
        onLogOutNavigate = {
            //
        },
        profileViewmodel = viewModel()
    )
}