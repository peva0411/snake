using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;

namespace Snake.Web
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/Content/universal").Include(
                "~/Content/bootstrap/bootstrap.css",
                "~/Content/bootstrap/bootstrap-theme.css"
            ));

            bundles.Add(new ScriptBundle("~/bundles/universal").Include(
                "~/Scripts/jquery-2.0.3.js",
                "~/Scripts/bootstrap.js"
            ));
            bundles.Add(new ScriptBundle("~/bundles/snake").Include(
                "~/Game/*.js"   
            ));

            bundles.Add(new StyleBundle("~/Content/snake").Include(
                "~/Game/*.css"
            ));

            bundles.Add(new ScriptBundle("~/bundles/test").Include(
                "~/Tests/*.js"
            ));
        }
    }
}