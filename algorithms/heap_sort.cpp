#include "heap_sort.hpp"
#include <algorithm>

void heapify(std::vector<int>& arr, int n, int i, nlohmann::json& steps) {
    int largest = i; // root
    int l = 2 * i + 1;
    int r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest])
        largest = l;

    if (r < n && arr[r] > arr[largest])
        largest = r;

    if (largest != i) {
        std::swap(arr[i], arr[largest]);
        steps.push_back({
            {"operation", "swap"},
            {"indices", {i, largest}},
            {"array_state", arr}
        });
        heapify(arr, n, largest, steps);
    }
}

void heap_sort(std::vector<int>& arr, nlohmann::json& steps) {
    int n = arr.size();

    for (int i = n / 2 - 1; i >= 0; i--)
        heapify(arr, n, i, steps);

    for (int i = n - 1; i > 0; i--) {
        std::swap(arr[0], arr[i]);
        steps.push_back({
            {"operation", "swap"},
            {"indices", {0, i}},
            {"array_state", arr}
        });
        heapify(arr, i, 0, steps);
    }
}
