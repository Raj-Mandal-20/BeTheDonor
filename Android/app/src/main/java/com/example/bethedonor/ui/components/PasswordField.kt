package com.example.bethedonor.ui.components

import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Person
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.focus.FocusDirection
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.bethedonor.ui.utils.validationRules.ValidationResult
import com.example.bethedonor.ui.theme.ErrorColor
import com.example.bethedonor.ui.theme.Gray1
import com.example.bethedonor.ui.theme.teal


@Composable
fun PasswordFiled(
    label: String = "hello",
    labelIcon: ImageVector = Icons.Filled.Person,
    isConfirmPasswordField: Boolean = false,
    onFiledValueChanged: (value: String) -> ValidationResult,
    recheckFiled: Boolean = false
) {
    val action = if (isConfirmPasswordField) ImeAction.Done else ImeAction.Next
    val localFocusManager = LocalFocusManager.current
    var password by rememberSaveable {
        mutableStateOf("")
    }
    var passwordVisible by rememberSaveable { mutableStateOf(false) }
    var isErrorState by remember {
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
        visualTransformation = if (passwordVisible) VisualTransformation.None else PasswordVisualTransformation(),
        leadingIcon = {
            Icon(
                labelIcon,
                contentDescription = label,
            )
        },
        trailingIcon = {
            Icon(
                if (passwordVisible)
                    Icons.Filled.Visibility
                else
                    Icons.Filled.VisibilityOff,
                contentDescription = label,
                modifier = Modifier
                    .clickable {
                        passwordVisible = !passwordVisible
                    }
                    .clip(RoundedCornerShape(16.dp))
            )
            // Please provide localized description for accessibility services
            val description = if (passwordVisible) "Hide password" else "Show password"

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
            errorBorderColor = ErrorColor,
            errorLabelColor = ErrorColor,
            errorTrailingIconColor =ErrorColor,
            errorLeadingIconColor = ErrorColor,
            errorCursorColor = ErrorColor

        ),
        textStyle = TextStyle(color = Color.White),
        shape = RoundedCornerShape(16.dp),
        keyboardOptions = KeyboardOptions(
            keyboardType = KeyboardType.Password,
            imeAction = ImeAction.Next
        ),
        keyboardActions = KeyboardActions {
            if (isConfirmPasswordField)
                localFocusManager.clearFocus(true)
            else
                localFocusManager.moveFocus(focusDirection = FocusDirection.Down)
        },
        singleLine = true,
        maxLines = 1,
        isError = if (recheckFiled) {
            val result = onFiledValueChanged(password)
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
        value = password,
        onValueChange = {
            password = it
            onFiledValueChanged(it)
            val result = onFiledValueChanged(it)
            isErrorState = !result.status
            supportingTextState = result.errorComment
        })
}