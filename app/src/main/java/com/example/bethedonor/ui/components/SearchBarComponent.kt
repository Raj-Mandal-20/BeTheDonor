package com.example.bethedonor.ui.components
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Clear
import androidx.compose.material.icons.filled.Search
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextIndent
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.bethedonor.ui.theme.fadeBlue1

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SearchBarComponent(
    searchQuery: String,
    onSearchQueryChange: (String) -> Unit,
    modifier: Modifier
) {
    TextField(
        value = searchQuery,
        onValueChange = {
            onSearchQueryChange(it)
        },
        modifier = modifier
            .height(50.dp),
        textStyle = TextStyle(
            textIndent = TextIndent(),
            textAlign = TextAlign.Start,
            fontSize = 16.sp
        ),
        trailingIcon = {
            if(searchQuery.isNotEmpty())
            Icon(
                imageVector = Icons.Filled.Clear,
                contentDescription = "clear",
                modifier = Modifier.size(30.dp).clickable {
                    onSearchQueryChange("")
                }
            )
        },
        leadingIcon = {
            Icon(
                imageVector = Icons.Filled.Search,
                contentDescription = "search",
                modifier = Modifier.size(30.dp)
            )
        },
        placeholder = {
            Text(
                text = "Search",
                style = TextStyle(color = Color.Gray, fontSize = 16.sp)
            )
        },
        shape = RoundedCornerShape(8.dp),
        colors = TextFieldDefaults.colors(
            focusedContainerColor = fadeBlue1,
            unfocusedContainerColor = fadeBlue1,
            disabledContainerColor = fadeBlue1,
            focusedTextColor = Color.White,
            disabledTextColor = Color.White,
            unfocusedTextColor = Color.White,
            cursorColor = Color.White,
            focusedIndicatorColor = Color.Transparent,
            unfocusedIndicatorColor = Color.Transparent,
            unfocusedLeadingIconColor = Color.Gray,
            focusedLeadingIconColor = Color.Gray,
            unfocusedTrailingIconColor = Color.White,
            focusedTrailingIconColor = Color.White
        ),
        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
    )
}