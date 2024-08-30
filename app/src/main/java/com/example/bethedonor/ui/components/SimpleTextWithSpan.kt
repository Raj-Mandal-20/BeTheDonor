package com.example.bethedonor.ui.components

import android.util.Log
import androidx.compose.foundation.text.ClickableText
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.withStyle
import com.example.bethedonor.ui.theme.teal

@Composable
fun SimpleTextWithSpan(text1: String, spanText: String,onTextClicked: (String)->Unit,modifier: Modifier) {
    val annotatedString = buildAnnotatedString {
        withStyle(style = SpanStyle(color = Color.Gray)) {
            append(text1)
        }
        withStyle(
            style = SpanStyle(
                color = teal,
            )
        ) {
            pushStringAnnotation(tag = spanText, annotation = spanText)
            append(spanText)
        }
    }
    ClickableText(style = TextStyle(fontWeight = FontWeight.SemiBold, color = Color.DarkGray),text = annotatedString, onClick = { offset ->
        annotatedString.getStringAnnotations(offset, offset)
            .firstOrNull()?.also { span ->
                Log.d("ClickableTextComponent", "$span")
                    onTextClicked(span.item)
            }
    }, modifier = modifier)
}