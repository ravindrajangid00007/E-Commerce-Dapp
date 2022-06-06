//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;
import "./Products.sol";
import "./Sellers.sol";
import "./Buyers.sol";

contract Ecommerce is Products, Sellers, Buyers {
    function buyProduct(uint256[] memory _prodIds, uint256[] memory _qnt)
        public
        payable
        onlyBuyer
    {
        uint256 totalAmt = 0;
        for (uint256 prod = 0; prod < _prodIds.length; prod++) {
            decreaseStock(_prodIds[prod], _qnt[prod]);
            uint256 amt = getPrice(_prodIds[prod]) * _qnt[prod];
            totalAmt += amt;
            address payable selleradd = getSellerAddress(_prodIds[prod]);
            addOrder(_prodIds[prod], _qnt[prod], amt,selleradd);
        }
        require(msg.value >= totalAmt, "insufficient ethers for transaction");
    }

    function addProduct(
        string memory _name,
        uint256 _price,
        uint256 _stock,
        string memory _imgHash
    ) public onlySeller {
        require(_stock > 0, "invalid stock qnt");
        require(_price > 0, "invalid price amt");

        productCount++;
        products.push(
            Product(
                productCount,
                _name,
                _price,
                _stock,
                _imgHash,
                payable(msg.sender)
            )
        );
        SellerProductCount[msg.sender]++;
        emit ProductAdded(
            productCount,
            _name,
            _price,
            _stock,
            _imgHash,
            payable(msg.sender)
        );
    }

    function confirmation(uint256 _oId) public payable {
        confirmOrder(_oId);
        uint256 amt = getPendingOrderAmt(_oId);
        uint256 weiAmt = amt*(10**18);
        address payable sellerAddress = getOrderSellerAddress(_oId);
        sellerAddress.transfer(weiAmt);
    }

    function getbBalance() view public returns(uint256){
        return address(this).balance;
    }
}
