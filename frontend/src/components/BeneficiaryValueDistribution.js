import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { getAssets, getBeneficiaries } from '../services/api';

const BeneficiaryValueDistribution = ({ refreshTrigger }) => {
    const [chartData, setChartData] = useState([]);
    const [totalEstateValue, setTotalEstateValue] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all assets and beneficiaries
                const assetsResponse = await getAssets();
                const beneficiariesResponse = await getBeneficiaries();

                // Filter only valued assets
                const valuedAssets = assetsResponse.data.filter(asset => asset.valued);

                // Calculate total estate value
                const totalValue = valuedAssets.reduce((sum, asset) => sum + (asset.value || 0), 0);
                setTotalEstateValue(totalValue);

                // Create a map to track beneficiary values
                const beneficiaryValuesMap = new Map();

                // Distribute asset values among beneficiaries
                valuedAssets.forEach(asset => {
                    if (asset.beneficiaries && asset.beneficiaries.length > 0) {
                        const assetValuePerBeneficiary = asset.value / asset.beneficiaries.length;

                        asset.beneficiaries.forEach(beneficiary => {
                            const currentValue = beneficiaryValuesMap.get(beneficiary.id) || 0;
                            beneficiaryValuesMap.set(beneficiary.id, currentValue + assetValuePerBeneficiary);
                        });
                    }
                });

                // Transform data for chart
                const chartData = beneficiariesResponse.data.map(beneficiary => ({
                    id: beneficiary.id,
                    name: `${beneficiary.first_name} ${beneficiary.last_name}`,
                    value: beneficiaryValuesMap.get(beneficiary.id) || 0,
                    percentage: totalValue > 0
                        ? ((beneficiaryValuesMap.get(beneficiary.id) || 0) / totalValue * 100).toFixed(2)
                        : 0
                })).sort((a, b) => b.value - a.value);

                setChartData(chartData);
            } catch (error) {
                console.error('Error fetching beneficiary distribution data:', error);
            }
        };

        fetchData();
    }, [refreshTrigger]); // Add refreshTrigger as a dependency

    return (
        <div className="bg-light p-4 rounded shadow mb-4">
            <h5 className="text-primary mb-4">Beneficiary Value Distribution</h5>
            <div className="row">
                <div className="col-md-9">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart layout="vertical" data={chartData}>
                            <XAxis
                                type="number"
                                domain={[0, totalEstateValue]}
                                tickFormatter={(value) => `$${value.toLocaleString()}`}
                            />
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={150}
                            />
                            <Tooltip
                                formatter={(value, name, props) => [
                                    `$${value.toLocaleString()}`,
                                    `${props.payload.percentage}% of Estate`
                                ]}
                            />
                            <Bar dataKey="value" fill="#007bff">
                                {chartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={`rgba(0, 123, 255, ${1 - index * 0.2})`}
                                    />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="col-md-3 d-flex align-items-center">
                    <div>
                        <h6>Total Estate Value</h6>
                        <h3 className="text-primary">${totalEstateValue.toLocaleString()}</h3>
                        <small className="text-muted">Based on valued assets</small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeneficiaryValueDistribution;