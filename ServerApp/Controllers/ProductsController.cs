using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServerApp.Data;
using ServerApp.DTO;
using ServerApp.Models;

namespace ServerApp.Controllers
{
    [Authorize]
    //localhost:5000/api/products
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController: ControllerBase
    {
         private readonly SocialContext _context;
        ///(1)
        ///private static readonly 
        ///private erişim belirleyicisi, değişkene sadece tanımlandığı sınıf içinde erişilebileceğini belirtir. Diğer sınıflardan erişim engellenir.
        ///static anahtar kelimesi, değişkenin sınıf düzeyinde olduğunu gösterir. Bu, değişkenin sınıfın herhangi bir örneği olmadan da erişilebilir olduğu anlamına gelir. Örneğin, MyClass.MyVariable şeklinde kullanılabilir.
        ///readonly anahtar kelimesi, değişkenin sadece bir kez değer atanabileceğini belirtir. Bu, değişkenin tanımlandığı yerde veya sınıfın kurucusunda değer atandıktan sonra başka bir yerde değiştirilemeyeceği anlamına gelir. Sabit bir değeri temsil etmek için kullanışlıdır. 
        /// 
        // private static readonly string[] Products = 
        // {
        //    "samsung s6","samsung s7", "samsung s8"
        // };

        //(2) public static List<Product> _products;  
        public ProductsController(SocialContext context)
        {
             _context = context;
        //(2)
        // _products= new List<Product>();
        // _products.Add(new Product(){ProductId=1, Name="Samsung s1", price=1000, isActive=true});
        // _products.Add(new Product(){ProductId=2, Name="Samsung s2", price=2000, isActive=true});
        // _products.Add(new Product(){ProductId=3, Name="Samsung s3", price=3000, isActive=false});
        // _products.Add(new Product(){ProductId=4, Name="Samsung s4", price=4000, isActive=true});
        // _products.Add(new Product(){ProductId=5, Name="Samsung s5", price=5000, isActive=false});
        }

        [AllowAnonymous]
        //localhost:5000/api/products
        [HttpGet]
        public async Task<IActionResult> GetProducts(){
            
            //burada almış olduğumuz objeleri dto objesi içerisine paketliyoruz.
            //bu şekilde tüm ürünler listelenirken secret bilgisi görünmez!
            var products = await _context
                                    .Products
                                    .Select(p=>ProductToDto(p))
                                    .ToListAsync();
            return Ok(products);
        }
 
        //localhost:5000/api/products/2
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id){

            var p = await _context.Products.FindAsync(id);
            if(p==null){
                return NotFound();
            }
            return Ok(ProductToDto(p)); 
            // 200 durum koduyla beraber ilgili objeyide responsun içerisnde ekler ve bize bunu geriye gönderir
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product entity)
        {
            _context.Products.Add(entity);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProduct), new{id=entity.ProductId},ProductToDto(entity));
            //CreatedAtAction bu method bize 201 durum koduyla beraber geri dönüyor
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, Product entity)
        {
            if (id!=entity.ProductId)
            {
                return BadRequest();
            }

            var product = await _context.Products.FindAsync(id);

            if(product==null)
            {
                return NotFound();
            }

            product.Name=entity.Name;
            product.price=entity.price;
            try{
                await _context.SaveChangesAsync();
            }
            catch(Exception)
            {
                return NotFound();
            }
            return NoContent();
            //NoContent 204 kodunu geriye döndürüyor. 

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if(product==null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private static ProductDTO ProductToDto(Product p)
        {
            return new ProductDTO()
            {
                ProductId= p.ProductId,
                Name=p.Name,
                price=p.price,
                isActive=p.isActive
            };
        }
    }
}