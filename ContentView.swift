//
//  ContentView.swift
//  VXchatApp
//

import SwiftUI
import CoreBluetooth

struct ContentView: View {
    var body: some View {
        VStack(spacing: 20) {
            Text("VXchatApp")
                .font(.largeTitle)
                .bold()
            Text("🔵 Bluetooth Mesh Mode Enabled")
                .font(.headline)
            Spacer()
            Text("💬 Tap to Ping Nearby Users")
            Button("🔊 Broadcast Emoji Ping") {
                // Placeholder for BT trigger
            }
            Spacer()
            Text("📡 Powered by VAXINX Protocol™")
                .font(.footnote)
        }
        .padding()
    }
}
