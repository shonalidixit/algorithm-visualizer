#ifndef QUICK_SORT_HPP
#define QUICK_SORT_HPP

#include <vector>
#include "json.hpp"

void quick_sort(std::vector<int>& arr, int low, int high, nlohmann::json& steps);

#endif
