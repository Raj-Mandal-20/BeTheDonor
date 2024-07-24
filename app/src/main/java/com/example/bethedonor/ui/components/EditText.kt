package com.example.bethedonor.ui.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Person
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.bethedonor.ui.utils.validationRules.ValidationResult
import com.example.bethedonor.ui.theme.ErrorColor
import com.example.bethedonor.ui.theme.Gray1
import com.example.bethedonor.ui.theme.teal


@Composable
fun EditText(
    label: String = "hello",
    labelIcon: ImageVector = Icons.Filled.Person,
    onFiledValueChanged: (value: String) -> ValidationResult,
    recheckFiled: Boolean = false,
    value: String="",
) {
    var textValue by rememberSaveable {
        mutableStateOf(value)
    }
    var isTrailingIconVisible by rememberSaveable {
        mutableStateOf(false)
    }
    var isErrorState by rememberSaveable {
        mutableStateOf(false)
    }
    var supportingTextState by rememberSaveable {
        mutableStateOf("")
    }
    OutlinedTextField(
        modifier = Modifier
            .fillMaxWidth()
            .clip(shape = RoundedCornerShape(8.dp)),
        label = { Text(text = label,fontSize = 14.sp) },
        leadingIcon = {
            Icon(
                labelIcon,
                contentDescription = label,
            )
        },
        trailingIcon = {
            if (isTrailingIconVisible) {
                Icon(
                    Icons.Filled.Clear,
                    contentDescription = label,
                    modifier = Modifier
                        .clickable {
                            textValue = ""
                            isTrailingIconVisible = false
                        }
                        .clip(RoundedCornerShape(16.dp))
                )
            }
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
            errorLabelColor = ErrorColor,
            errorBorderColor = ErrorColor,
            errorLeadingIconColor = ErrorColor,
            errorCursorColor = ErrorColor
        ),
        textStyle = TextStyle(color = Color.White),
        shape = RoundedCornerShape(16.dp),
        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next),
        singleLine = true,
        maxLines = 1,
        isError = if (recheckFiled) {
            val result = onFiledValueChanged(textValue)
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
        value = textValue,
        onValueChange = {
            textValue = it
            isTrailingIconVisible = textValue.isNotEmpty()
            val result = onFiledValueChanged(it)
            isErrorState = !result.status
            supportingTextState = result.errorComment
        }

    )
}
