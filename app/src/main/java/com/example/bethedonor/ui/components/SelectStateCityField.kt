package com.example.bethedonor.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.bethedonor.ui.utils.validationRules.ValidationResult
import com.example.bethedonor.ui.theme.ErrorColor
import com.example.bethedonor.ui.theme.Gray1
import com.example.bethedonor.ui.theme.teal

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SelectStateDistrictCityField(
    label: String,
    options: List<String>,
    selectedValue: String?,
    onSelection: (String) -> ValidationResult,
    recheckFiled: Boolean = false,
    modifier: Modifier,
) {
    var expanded by remember { mutableStateOf(false) }
    //var selectedOptionText by remember { mutableStateOf("") }
//    var selectedState by remember {
//        mutableStateOf(null as State?)
//    }
    var isErrorState by rememberSaveable {
        mutableStateOf(false)
    }
    var supportingTextState by rememberSaveable {
        mutableStateOf("")
    }

    ExposedDropdownMenuBox(
        expanded = expanded,
        onExpandedChange = { expanded = !expanded },
        modifier
            .clip(shape = RoundedCornerShape(8.dp)),
    ) {
        OutlinedTextField(
            readOnly = true,
            label = { Text(text = label, fontSize = 14.sp) },
            trailingIcon = {
                ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded)
            },
            colors = OutlinedTextFieldDefaults.colors(
                focusedLabelColor = teal,
                focusedBorderColor = teal,
                unfocusedBorderColor = Gray1,
                unfocusedLabelColor = Color.Gray,
                cursorColor = teal,
                focusedLeadingIconColor = Color.White,
                unfocusedLeadingIconColor = Color.Gray,
                focusedTrailingIconColor = Color.White,
                unfocusedTrailingIconColor = Color.Gray,
                errorLabelColor = ErrorColor,
                errorBorderColor = ErrorColor,
                errorLeadingIconColor = ErrorColor,
                errorCursorColor = ErrorColor
            ),
            textStyle = TextStyle(color = Color.White),
            shape = RoundedCornerShape(16.dp),
            isError = if (recheckFiled) {
                val result = onSelection(selectedValue ?: "")
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
            value = selectedValue ?: "",
            onValueChange = {},
            modifier = Modifier
                .menuAnchor()
                .fillMaxWidth()
        )
        ExposedDropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false },
            scrollState = rememberScrollState(),
            modifier = Modifier.background(Color.White)
        ) {
            options.forEach { option: String ->
                DropdownMenuItem(
                    text = { Text(text = option, color = Color.Black) },
                    onClick = {
                        expanded = false
                        // selectedOptionText=option
                        onSelection(option)
                    }
                )
            }
        }
    }

}
//@OptIn(ExperimentalMaterial3Api::class)
//@Composable
//fun SelectDistrictCityField(
//    options: List<String>,
//    onSelection: (String) -> ValidationResult,
//    recheckFiled: Boolean = false,
//    modifier: Modifier,
//    selectedCity: MutableState<String?> // Add this parameter to pass the selected city state
//) {
//    var expanded by remember { mutableStateOf(false) }
//    var isErrorState by rememberSaveable {
//        mutableStateOf(false)
//    }
//    var supportingTextState by rememberSaveable {
//        mutableStateOf("")
//    }
//
//    ExposedDropdownMenuBox(
//        expanded = expanded,
//        onExpandedChange = { expanded = !expanded },
//        modifier
//            .clip(shape = RoundedCornerShape(8.dp)),
//    ) {
//        OutlinedTextField(
//            readOnly = true,
//            label = { Text(text = "District", fontSize = 14.sp) },
//            trailingIcon = {
//                ExposedDropdownMenuDefaults.TrailingIcon(expanded = expanded)
//            },
//            colors = OutlinedTextFieldDefaults.colors(
//                focusedLabelColor = teal,
//                focusedBorderColor = teal,
//                unfocusedBorderColor = Gray1,
//                unfocusedLabelColor = Color.Gray,
//                cursorColor = teal,
//                focusedLeadingIconColor = Color.White,
//                unfocusedLeadingIconColor = Color.Gray,
//                focusedTrailingIconColor = Color.White,
//                unfocusedTrailingIconColor = Color.Gray,
//                errorLabelColor = ErrorColor,
//                errorBorderColor = ErrorColor,
//                errorLeadingIconColor = ErrorColor,
//                errorCursorColor = ErrorColor
//            ),
//            textStyle = TextStyle(color = Color.White),
//            shape = RoundedCornerShape(16.dp),
//            isError = if (recheckFiled) {
//                val result = onSelection(selectedCity.value ?: "")
//                supportingTextState = result.errorComment
//                isErrorState = !result.status
//                isErrorState
//            } else isErrorState,
//            supportingText = {
//                if (isErrorState) {
//                    Text(
//                        text = supportingTextState,
//                        modifier = Modifier.fillMaxWidth(),
//                        color = ErrorColor
//                    )
//                }
//            },
//            value = selectedCity.value ?: "",
//            onValueChange = {},
//            modifier = Modifier
//                .menuAnchor()
//                .fillMaxWidth()
//                .padding(start = 4.dp)
//        )
//        ExposedDropdownMenu(expanded = expanded, onDismissRequest = { expanded = false }) {
//            options.forEach { option: String ->
//                DropdownMenuItem(
//                    text = { Text(text = option) },
//                    onClick = {
//                        expanded = false
//                        selectedCity.value = option
//                        onSelection(selectedCity.value ?: "")
//                    }
//                )
//            }
//        }
//    }
//}