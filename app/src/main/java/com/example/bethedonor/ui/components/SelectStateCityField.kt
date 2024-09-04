package com.example.bethedonor.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ExposedDropdownMenuBox
import androidx.compose.material3.ExposedDropdownMenuDefaults
import androidx.compose.material3.HorizontalDivider
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
import androidx.compose.ui.layout.onGloballyPositioned
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.bethedonor.ui.utils.validationRules.ValidationResult
import com.example.bethedonor.ui.theme.ErrorColor
import com.example.bethedonor.ui.theme.Gray1
import com.example.bethedonor.ui.theme.bgDarkBlue
import com.example.bethedonor.ui.theme.bgDarkBlue2
import com.example.bethedonor.ui.theme.darkGray
import com.example.bethedonor.ui.theme.fadeBlue11
import com.example.bethedonor.ui.theme.teal
import com.example.bethedonor.ui.utils.commons.linearGradientBrush

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
    var isErrorState by rememberSaveable { mutableStateOf(false) }
    var supportingTextState by rememberSaveable { mutableStateOf("") }
    var searchText by rememberSaveable { mutableStateOf(selectedValue ?: "") } // Display selected value
    var dropdownSearchText by rememberSaveable { mutableStateOf("") } // Search text for filtering options

    val filteredOptions = options.filter { it.contains(dropdownSearchText, ignoreCase = true) } // Filtered options based on search
    val configuration = LocalConfiguration.current
    val screenHeight = configuration.screenHeightDp.dp
    var textFieldWidth by remember { mutableStateOf(0.dp) }
    val density = LocalDensity.current

    ExposedDropdownMenuBox(
        expanded = expanded,
        onExpandedChange = { expanded = !expanded },
        modifier = modifier.clip(shape = RoundedCornerShape(8.dp))
    ) {
        // Main input field - Read-Only
        OutlinedTextField(
            readOnly = true,  // Set to read-only
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
                val result = onSelection(searchText) // Validate based on the selected value
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
            value = searchText, // Display the selected value
            onValueChange = { /* No action needed since it is read-only */ },
            modifier = Modifier
                .menuAnchor()
                .fillMaxWidth()
                .onGloballyPositioned { coordinates ->
                    textFieldWidth = with(density) { coordinates.size.width.toDp() }
                }
        )
        // Dropdown with search field
        ExposedDropdownMenu(
            expanded = expanded,
            onDismissRequest = { expanded = false },
            modifier = Modifier
                .background(fadeBlue11)
                .width(textFieldWidth * 2f),
            scrollState = rememberScrollState()
        ) {
            // Search field inside the dropdown
            SearchBarComponent(
                searchQuery =dropdownSearchText,
                onSearchQueryChange = {
                   dropdownSearchText=it
                },
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(8.dp)//.border(1.dp, bloodRed2, shape = RoundedCornerShape(8.dp)))
            )
//            OutlinedTextField(
//                value = dropdownSearchText,
//                onValueChange = { dropdownSearchText = it },
//                placeholder = { Text(text = "Search...", color = Color.Gray) },
//                singleLine = true,
//                modifier = Modifier
//                    .fillMaxWidth()
//                    .padding(8.dp)
//                    .background(Color.White, RoundedCornerShape(8.dp))
//            )
            LazyColumn(
                modifier = Modifier
                    .width(textFieldWidth)
                    .height(screenHeight * 0.5f)
            ) {
                items(filteredOptions) { option ->
                    Column(
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable {
                                expanded = false
                                searchText =
                                    option // Set the read-only field to the selected option
                                dropdownSearchText = "" // Reset search text after selection
                                val validationResult = onSelection(option)
                                supportingTextState = validationResult.errorComment
                                isErrorState = !validationResult.status
                            }
                    ) {
                        Spacer(modifier = Modifier.height(12.dp))
                        Text(
                            text = option,
                            modifier = Modifier
                                .padding(start = 10.dp)
                                .width(textFieldWidth),
                            color = Color.White
                        )
                        Spacer(modifier = Modifier.height(12.dp))
                    }
                }
            }
        }
    }
}
