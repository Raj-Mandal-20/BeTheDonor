import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.focus.FocusRequester
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.arpitkatiyarprojects.countrypicker.CountryPickerOutlinedTextField
import com.arpitkatiyarprojects.countrypicker.models.CountryDetails
import com.arpitkatiyarprojects.countrypicker.models.PickerTextStyles
import com.example.bethedonor.ui.utils.validationRules.ValidationResult
import com.example.bethedonor.ui.theme.ErrorColor
import com.example.bethedonor.ui.theme.Gray1
import com.example.bethedonor.ui.theme.teal

@Composable
fun PhoneNumberEditText(
    onFieldValueChanged: (value: String) -> ValidationResult,
    recheckField: Boolean = false,
    value: String = "",
    code: (value: String) -> Unit,
    modifier: Modifier,
    countryCode:String="in",
    readOnly:Boolean=false
) {

    var isTrailingIconVisible by rememberSaveable {
        mutableStateOf(false)
    }
    var isErrorState by rememberSaveable {
        mutableStateOf(false)
    }
    var supportingTextState by rememberSaveable {
        mutableStateOf("")
    }
    val isFocused by remember { mutableStateOf(false) }
    val selectedCountryState: MutableState<CountryDetails?> = remember {
        mutableStateOf(null)
    }
    var mobileNumber by remember {
        mutableStateOf(value)
    }
    // Create a FocusRequester to manage focus between fields
    val focusRequester = remember { FocusRequester() }
    Row(
        modifier = modifier
            .clip(shape = RoundedCornerShape(8.dp))
    ) {
        // Dropdown menu for selecting country code
        CountryPickerOutlinedTextField(
            readOnly = readOnly,
            mobileNumber = mobileNumber,
            modifier = Modifier
                .weight(1f)
            ,
            label = {
                Text(text = "Ph no")
            },
            trailingIcon = {
                if (isTrailingIconVisible) {
                    Icon(
                        Icons.Filled.Clear,
                        contentDescription = "Clear",
                        tint = Color.Black,
                        modifier = Modifier
                            .clickable {
                                mobileNumber = ""
                                isTrailingIconVisible = false
                            }
                            .clip(RoundedCornerShape(16.dp))
                            .padding(8.dp) // Adjust padding as needed
                    )
                }
            },
            countriesList = listOf("in"),
            defaultCountryCode = countryCode,
            onMobileNumberChange = {
                mobileNumber = it
                isTrailingIconVisible = mobileNumber.isNotEmpty()
                val result = onFieldValueChanged(it)
                isErrorState = !result.status
                supportingTextState = result.errorComment
            },
            onCountrySelected = {
                selectedCountryState.value = it
                code(it.countryPhoneNumberCode)
            },
            colors = OutlinedTextFieldDefaults.colors(
                focusedLabelColor = teal,
                focusedBorderColor = teal,
                unfocusedBorderColor = if (isFocused) teal else Gray1,
                unfocusedLabelColor = if (isFocused) teal else Color.Gray,
                cursorColor = teal,
                focusedLeadingIconColor = Color.White,
                focusedTrailingIconColor = Color.White,
                unfocusedLeadingIconColor = Color.Gray,
                unfocusedTrailingIconColor = Color.Gray,
                errorLabelColor = ErrorColor,
                errorBorderColor = ErrorColor,
                errorLeadingIconColor = ErrorColor,
                errorCursorColor = ErrorColor
            ),
            textStyle = TextStyle(color = Color.White),
            shape = RoundedCornerShape(16.dp),
            singleLine = true,
            maxLines = 1,
            pickerTextStyles = PickerTextStyles(
                countryNameTextStyle = TextStyle(
                    color = Color.White,
                    fontSize = 16.sp
                )
            ),
            isError = if (recheckField) {
                val result = onFieldValueChanged(mobileNumber)
                supportingTextState = result.errorComment
                isErrorState = !result.status
                isErrorState
            } else isErrorState,
            supportingText = {
                if (isErrorState) {
                    Text(
                        text = supportingTextState,
                        modifier = Modifier.fillMaxWidth(),
                        color = ErrorColor
                    )
                }
            },

            onDone = {
                KeyboardActions(onDone = {
                    KeyboardOptions(imeAction = ImeAction.Next)
                })
            },
            interactionSource = remember { MutableInteractionSource() },
        )

    }
}


