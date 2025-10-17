#include <vector>
#include "json.hpp"
void dijkstra(int src, const std::vector<std::vector<std::pair<int,int>>>& g, std::vector<int>& dist, nlohmann::json& steps);
