import React from 'react';

export default function TailwindComponent() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-blue-500 text-white p-4">
                <div className="container mx-auto">
                    <h1 className="text-lg font-bold">TailwindComponent Header</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-4 space-y-4">
                <section className="bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="font-semibold text-xl mb-2">Main Section</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et euismod ligula. Morbi mattis pretium eros, sed ultrices leo imperdiet eget.</p>
                </section>

                <section className="bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="font-semibold text-xl mb-2">Secondary Section</h2>
                    <p>Phasellus nec iaculis mauris. Curabitur in efficitur arcu, nec lobortis arcu. Proin vitae nulla laoreet, tincidunt ligula non, commodo mauris.</p>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4">
                <div className="container mx-auto text-center">
                    <p>&copy; 2024 TailwindComponent Footer</p>
                </div>
            </footer>
        </div>
    );
}
