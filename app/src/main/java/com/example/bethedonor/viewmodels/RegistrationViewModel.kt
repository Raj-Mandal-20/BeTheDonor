package com.example.bethedonor.viewmodels

import android.util.Log
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.compose.ui.util.packInts
import androidx.lifecycle.ViewModel
import com.example.bethedonor.data.State
import com.example.bethedonor.data.statesWithCities
import com.example.bethedonor.data.uievent.RegistrationUIEvent
import com.example.bethedonor.data.uistate.RegistrationUiState
import com.example.bethedonor.data.validationRules.Validator
import com.example.bethedonor.utils.AreaData


class RegistrationViewModel : ViewModel() {
    private val TAG = RegistrationViewModel::class.simpleName

    val areaData: MutableState<AreaData?> = mutableStateOf(null)

    var registrationUIState = mutableStateOf(RegistrationUiState())
    val stateList = statesWithCities

    // Initialize selectedState
    var selectedState: MutableState<String?> = mutableStateOf(null)
    var selectedDistrict: MutableState<String?> = mutableStateOf(null)
    var selectedCity: MutableState<String?> = mutableStateOf(null)
    var selectedPinCode: MutableState<String?> = mutableStateOf(null)
    var availableToDonate:MutableState<Boolean> = mutableStateOf(true)
    var requestInProgress = mutableStateOf(true)

    fun setAreaData(data: AreaData?) {
        areaData.value = data
    }

    fun getStateDataList(): List<String> {
        return areaData.value?.states?.keys?.toList() ?: emptyList()
    }

    fun getDistrictList(): List<String> {
        return selectedState.value?.let { areaData.value?.states?.get(it)?.keys?.toList() }
            ?: emptyList()
    }

    fun getCityList(): List<String> {
        return selectedDistrict.value?.let {
            areaData.value?.states?.get(selectedState.value)?.get(it)?.keys?.toList()
        } ?: emptyList()
    }

    fun getPinCodeList(): List<String> {
        return selectedCity.value?.let {
            areaData.value?.states?.get(selectedState.value)?.get(selectedDistrict.value)?.get(it)
        }?.let { listOf(it) } ?: emptyList()
    }

    fun selectState(state: String) {
        selectedState.value = state
        selectedDistrict.value = null
        selectedCity.value = null
        selectedPinCode.value = null
    }

    fun selectDistrict(district: String) {
        selectedDistrict.value = district
        selectedCity.value = null
        selectedPinCode.value = null
    }

    fun selectCity(city: String) {
        selectedCity.value = city
        selectedPinCode.value = null
    }

    fun selectPin(pinCode: String) {
        selectedPinCode.value = pinCode
    }

    fun setAvailableToDonate(value:Boolean){
        availableToDonate.value=value
    }

    fun onEvent(event: RegistrationUIEvent) {
        when (event) {
            is RegistrationUIEvent.NameValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    name = event.name,
                    nameErrorState = Validator.validateFirstName(event.name)
                )
            }

            is RegistrationUIEvent.EmailValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    emailId = event.emailId,
                    emailIdErrorState = Validator.validateEmailId(event.emailId)
                )
            }

            is RegistrationUIEvent.PhoneNoChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    phoneNo = event.phoneNo,
                    phoneNoErrorState = Validator.validatePhoneNo(event.phoneNo)
                )
            }

            is RegistrationUIEvent.PasswordValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    password = event.password,
                    passwordErrorState = Validator.validatePassword(event.password)
                )
            }

            is RegistrationUIEvent.ConfirmPasswordValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    confirmPassword = event.confirmPassword,
                    confirmPasswordState = Validator.validateConfirmPassword(
                        registrationUIState.value.password,
                        event.confirmPassword
                    )
                )
            }

            is RegistrationUIEvent.AgeValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    age = event.age,
                    ageErrorState = Validator.validateAge(event.age)
                )
            }

            is RegistrationUIEvent.BloodGroupValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    bloodGroup = event.bloodGroup,
                    bloodGroupErrorState = Validator.validateBloodGroup(event.bloodGroup)
                )
            }

            is RegistrationUIEvent.DistrictValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    district = event.district,
                    cityErrorState = Validator.validateDistrict(event.district)
                )
            }

            is RegistrationUIEvent.CityValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    city = event.city,
                    cityErrorState = Validator.validateCity(event.city)
                )
            }

            is RegistrationUIEvent.GenderValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    gender = event.gender,
                    genderErrorState = Validator.validateGender(event.gender)
                )
            }

            is RegistrationUIEvent.PinCodeValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    pinCode = event.pinCode,
                    pinCodeErrorState = Validator.validatePinCode(event.pinCode)
                )
            }

            is RegistrationUIEvent.StateValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    state = event.state,
                    stateErrorState = Validator.validateState(event.state)
                )
            }

            is RegistrationUIEvent.AvailabilityCheckerValueChangeEvent -> {
                registrationUIState.value = registrationUIState.value.copy(
                    checkedAvailabilityStatus = event.status
                )
            }

            RegistrationUIEvent.RegistrationButtonClick -> {
                printState()
            }

        }
    }

//    fun registration(
//        onProcessResult: (status: Boolean, message: String) -> Unit,
//        dataBase: FirebaseFirestore,
//        mainViewModel: MainViewModel
//    ) {
//        printState()
//        createUserInFirebase(
//            name = registrationUIState.value.name,
//            email = registrationUIState.value.emailId,
//            password = registrationUIState.value.confirmPassword,
//            profession = registrationUIState.value.profession,
//            onProcessResult = onProcessResult,
//            dataBase = dataBase,
//            mainViewModel = mainViewModel
//        )
//    }


    fun validateWithRulesForRegister(): Boolean {
        return registrationUIState.value.nameErrorState.status
                && registrationUIState.value.emailIdErrorState.status
                && registrationUIState.value.phoneNoErrorState.status
                && registrationUIState.value.ageErrorState.status
                && registrationUIState.value.genderErrorState.status
                && registrationUIState.value.bloodGroupErrorState.status
                && registrationUIState.value.stateErrorState.status
                && registrationUIState.value.cityErrorState.status
                && registrationUIState.value.pinCodeErrorState.status
                && registrationUIState.value.passwordErrorState.status
                && registrationUIState.value.confirmPasswordState.status
    }


    fun printState() {
        Log.d(TAG, "Inside_printState")
        Log.d(TAG, registrationUIState.value.toString())
    }

//    private fun createUserInFirebase(
//        name: String,
//        email: String,
//        password: String,
//        profession: String,
//        onProcessResult: (status: Boolean, message: String) -> Unit,
//        dataBase: FirebaseFirestore,
//        mainViewModel: MainViewModel
//    ) {
//        requestInProgress.value = true
//        val auth = FirebaseAuth.getInstance()
//        auth
//            .createUserWithEmailAndPassword(email, password)
//            .addOnCompleteListener { task ->
//                requestInProgress.value = false
//                if (task.isSuccessful) {
//                    mainViewModel.sendVerificationEmail(auth.currentUser, onProcessResult)
//                    saveUserData(name, email, profession, auth.currentUser!!.uid, dataBase)
//                }
//
//                Log.d("addOnCompleteListener", "Inside onComplete listener")
//            }
//            .addOnFailureListener { exception ->
//                requestInProgress.value = false
//                onProcessResult(false, exception.message.toString())
//                Log.d("addOnFailureListener", exception.stackTraceToString())
//            }
//    }
//
//    private fun saveUserData(
//        name: String,
//        email: String,
//        profession: String,
//        userId: String,
//        dataBase: FirebaseFirestore
//    ) {
//        val newUser = UserDataModel(name = name, emailID = email, profession = profession)
//        dataBase.collection("users")
//            .document(userId)
//            .set(newUser)
//            .addOnSuccessListener { it ->
//                Log.d("addOnSuccessListener", "Data Saved")
//            }
//            .addOnFailureListener {
//                Log.d("addOnFailureListener ", it.message.toString())
//            }
//    }


    fun resetUiState() {
        registrationUIState.value = RegistrationUiState()
    }
}
