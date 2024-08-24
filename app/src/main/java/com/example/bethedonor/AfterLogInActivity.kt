package com.example.bethedonor

import android.content.Intent
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.viewModels
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.SideEffect
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.lifecycle.lifecycleScope
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.compose.rememberNavController
import com.example.bethedonor.navigation.AfterLogInNavigationStack
import com.example.bethedonor.ui.theme.BeTheDonorTheme
import com.example.bethedonor.ui.theme.fadeBlue11
import com.example.bethedonor.utils.readJsonFromAssets
import com.example.bethedonor.utils.setAreaData
import com.example.bethedonor.viewmodels.HomeViewModel
import com.example.bethedonor.viewmodels.MainViewModel
import com.example.bethedonor.viewmodels.MainViewModelFactory
import com.google.accompanist.systemuicontroller.rememberSystemUiController
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class AfterLogInActivity : ComponentActivity() {
    private val mainViewModel: MainViewModel by viewModels {
        MainViewModelFactory(application)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)


        lifecycleScope.launch {
            val areaData = withContext(Dispatchers.IO) {
                readJsonFromAssets(this@AfterLogInActivity, "Location.json")
            }
            areaData?.let {
                setAreaData(it)
            }
        }

        //    WindowCompat.setDecorFitsSystemWindows(window, false)
        setContent {
            BeTheDonorTheme {
                val systemUiController = rememberSystemUiController()
                SideEffect {
                    systemUiController.setSystemBarsColor(fadeBlue11, darkIcons = false)
                }
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    val homeViewModel: HomeViewModel = viewModel()
                    val currentUserId = homeViewModel.getUserId()
                    val token = homeViewModel.getToken()
                    val userAvailabilityStatus = homeViewModel.getUserAvailabilityStatus()
                    AfterLogInNavigationStack(
                        navController = rememberNavController(),
                        userId = currentUserId,
                        token = token,
                        onLogOut = {
                            finish()
                            val intent = Intent(this, BeforeLogInActivity::class.java)
                            startActivity(intent)
                        }, mainViewModel = mainViewModel
                    )

                }
            }
        }
    }
}
