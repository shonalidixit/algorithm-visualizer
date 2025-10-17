#ifndef MERGE_SORT_HPP
#define MERGE_SORT_HPP

#include <vector>
#include "json.hpp"

void merge_sort(std::vector<int>& arr, int left, int right, nlohmann::json& steps);

#endif
