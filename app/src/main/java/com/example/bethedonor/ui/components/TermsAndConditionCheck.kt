package com.example.bethedonor.ui.components

import android.util.Log
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.text.ClickableText
import androidx.compose.material3.Checkbox
import androidx.compose.material3.CheckboxDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.withStyle
import androidx.compose.ui.unit.dp
import com.example.bethedonor.ui.theme.teal


@Composable
fun TermsAndConditionCheck(onTextSelected: (String) -> Unit,onCheckCLicked:(status:Boolean)->Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .height(50.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        val checkState = remember {
            mutableStateOf(false)
        }
        Checkbox(checked = checkState.value, onCheckedChange = {
            checkState.value = !checkState.value
            onCheckCLicked(it)

        }, colors = CheckboxDefaults.colors(teal))
        ClickableTextComponent(onTextSelected)
    }
}

@Composable
fun ClickableTextComponent(onTextSelected: (String) -> Unit) {
    val initialText = "By continuing you accept our "
    val privacyPolicyText = "Privacy Policy"
    val and = " and "
    val termsAndUse = "Terms and Uses"

    val annotatedString = buildAnnotatedString {
        withStyle(
            style = SpanStyle(Color.DarkGray)
        ) {
            append(initialText)
        }
        withStyle(
            style = SpanStyle(
                color = Color.DarkGray,
                textDecoration = TextDecoration.Underline,
                fontWeight = FontWeight.SemiBold
            )
        ) {
            pushStringAnnotation(tag = privacyPolicyText, annotation = privacyPolicyText)
            append(privacyPolicyText)
        }
        withStyle(
            style = SpanStyle(Color.DarkGray)
        ) {
            append(and)
        }
        withStyle(
            style = SpanStyle(
                color = Color.DarkGray,
                textDecoration = TextDecoration.Underline,
                fontWeight = FontWeight.SemiBold
            )
        ) {
            pushStringAnnotation(tag = termsAndUse, annotation = termsAndUse)
            append(termsAndUse)
        }
    }
    ClickableText(text = annotatedString, onClick = { offset ->
        annotatedString.getStringAnnotations(offset, offset)
            .firstOrNull()?.also { span ->
                Log.d("ClickableTextComponent", "$span")

                if (span.item == termsAndUse || span.item==privacyPolicyText) {
                    onTextSelected(span.item)
                }

            }

    })
}